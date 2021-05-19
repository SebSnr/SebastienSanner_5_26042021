let cartStorage = JSON.parse(localStorage.getItem('OrinocoCart'))
let submitBtn = document.getElementById("submit-btn")
let totalPrice = 0

//>>>>>>>>>> For activate changing quantity <<<<<<<<<<<<<<<<
let inputQuantityActivated = true   //>> change by true to enable quantity input in this page, do the same in product.js
function activateInputQuantity () {
    if (inputQuantityActivated === true) {
        for(let i in cartStorage) {
            document.getElementById(`itemQuantity-${i}`).removeAttribute("disabled")
        }
    } 
}

/******************* render cart content *******************/
// create and then render the cart data in the cart content
// if cart empty, return "cart empty" 

function showCart () {
    if (cartStorage){    
        let items = ""

        // create a new line with data for each product in the cart
        for(i in cartStorage){
            let item = cartStorage[i]

            items += `
                <tr class="align-middle">
                    <td>
                        <div class="media text-left align-middle">
                            <a class="thumbnail " href="product.html#${item.Id}"><img class="media-object" src="${item.imageUrl}" height="70px"></a>
                        </div>
                    </td>
                    <td lass="text-left align-middle">${item.name}</td>
                    <td class="text-center align-middle" >
                        <input type="number" class="form-control col-2" id="itemQuantity-${i}" disabled oninput="updatePrice(value, ${i}), validity.valid||(value=' ')" value="${item.quantity}" min="1" max="100">
                        <small id="itemErrorMessage-${i}" class="form-text text-muted"></small>
                    </td>
                    <td class="text-center align-middle" id="updated-price-${i}">${item.totalPrice}</td>
                    <td class="text-center">
                        <button onclick="deleteItem(${i})" class="btn btn-outline-danger deleteItemBtn" id="deleteItemBtn">
                            <img src="./assets/icons/corbeille.svg" width="13px"alt="bouton supprimer produit">
                        </button>
                    </td>
                </tr>
            `
        }
        return items
    }
    else {
        return `
            <tr class="align-middle">
                <td  colspan="5" class="text-center align-middle" height="100px">Votre panier est vide</td>
            </tr>
        `
    }
}

/******************* delete one item from cart *******************/
// get the item index and delete it in the cart
// send the new cart in the local storage
// render the new cart and calculate the new total price
function deleteItem (index) {
    cartStorage.splice(index, 1)
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    document.getElementById('cartTable').innerHTML = showCart()
    document.getElementById('totalPrice').innerHTML = calculateTotalPrice()

    activateInputQuantity ()

    if (cartStorage.length === 0){
        deleteAllCart()
    }
}

/******************* delete the cart from local storage *******************/
function deleteAllCart () {
    localStorage.removeItem('OrinocoCart')
}

/******************* update item price *******************/
// get the new quantity and multiply by the item price
// remplace the quantity and total price of the item in the cart
// send the new cart in the local storage
// update the price in the HTML code

function updatePrice (newQuantity, index) {
    let price = cartStorage[index].price
    let newTotalPrice =  parseInt(price) * parseInt(newQuantity)
    let newItem = Object.assign (cartStorage[index], {'quantity' : newQuantity, 'totalPrice' : newTotalPrice}) // change the quantity of the item on index i in cartStorage
    Object.entries(newItem) // transform objet newItem in array
    cartStorage.splice(index, 1, newItem) // remplace the array at index i by the new one newItem
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    document.getElementById('totalPrice').innerHTML = calculateTotalPrice()
    document.getElementById(`updated-price-${index}`).innerHTML = newTotalPrice
}

/******************* calculate total price *******************/
// check all the items in the cart
// incremente the total price with : each quantity multiply by each item price
// update the total price in the HTML code

function calculateTotalPrice () {
    totalPrice = 0
    for(i in cartStorage){
        let item = cartStorage[i]
        totalPrice += item.price * item.quantity
        console.log(cartStorage)
    }

    // get a minimum of products to enable the submit button
    if (totalPrice < 1){
        submitBtn.setAttribute("disabled", true);
    }

    return `
        <td class="text-center"><h3>Prix total</h3></td>
        <td class="text-left"><h3>${totalPrice} €</h3></td>
            <td><h3> &nbsp; </h3></td>
    `
}

/******************* validate email *******************/
// if email no valid, show a message

let email = document.getElementById("email")
email.addEventListener('change', function() {
    if (email.checkValidity()){
        document.getElementById('emailHelp').innerHTML = "Toutes vos données sont sécurisées."
    }
    else {
        document.getElementById('emailHelp').innerHTML = "❌ Veuillez rentrer une adresse mail valide.  exemple:  bernard@hotmail.fr"
    }
})

/******************* validate other inputs one by one *******************/
// if input no valid, show a message

function validateOneInput (inputId) {
    let input = document.getElementById(`${inputId}`)
    input.addEventListener('change', function() {
        if (input.checkValidity()){
            document.getElementById(`${inputId}Help`).innerHTML = ""
        }
        else {
            document.getElementById(`${inputId}Help`).innerHTML = "❌ Donnée invalide"
        }
    })
}

validateOneInput("firstName")
validateOneInput("lastName")
validateOneInput("address")
validateOneInput("city")

/******************* enabled submit button *******************/
// if all form inputs are validated
// and more thant 0€ in cart total price, 
// render submit button accessible 

let contactForm = document.getElementById('contact-form')
contactForm.addEventListener('change', function() {
    if (contactForm.checkValidity() && totalPrice > 0){
        submitBtn.removeAttribute("disabled", false);
    }
    else {
        submitBtn.setAttribute("disabled", true);
    }
})

/******************* send order data *******************/
// get the input values from the form contact
// get a product id list from the cart
// use fetch and post method to send data to the server
// with the response of fetch, create a session storage
// create a session storage with the total price
// delete the cart and href to confirm page

function sendOrder () {

    const customerInformations = {firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    email: document.getElementById('email').value
    }
   
    let idList = []
    for(let i in cartStorage){
        idList.push(cartStorage[i].Id)
    }
    
    orderData = {contact: customerInformations, products : idList}

    fetch('http://localhost:3000/api/teddies/order', {
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
        .then(response => response.json()) 
        .then(function (json){
            sessionStorage.setItem('OrinocoOrderConfirmation', JSON.stringify(json))
            sessionStorage.setItem('OrinocoTotalPriceOrder', JSON.stringify(totalPrice))
            deleteAllCart()
            window.location.href = 'confirm.html'
        })
        .catch((error) => console.log("error :", error))
}

// when click on the submit button, send order data to server
submitBtn.addEventListener('click', function(e) {
    e.preventDefault()
    sendOrder()
})

// call functions when page loading //
window.load = document.getElementById('cartTable').innerHTML = showCart()
window.load = document.getElementById('totalPrice').innerHTML = calculateTotalPrice()

/******************* activate changing quantity *******************/
activateInputQuantity ()



// console.log(cartStorage)
// console.log(JSON.parse(sessionStorage.getItem('OrinocoOrderConfirmation')))
// sessionStorage.removeItem('OrinocoOrderConfirmation')
