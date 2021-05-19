let cartStorage = JSON.parse(localStorage.getItem('OrinocoCart'))
let submitBtn = document.getElementById("submit-btn")
let totalPrice = 0


//>>>>>>>>>> For activate changing quantity <<<<<<<<<<<<<<<<
let inputQuantityActivated = true   //>> change by true to enable quantity input in this page

/******************* render cart content*******************/
function showCart () {
    if (cartStorage){    
        let items = ""
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
                        <input type="number" class="form-control col-2" id="itemQuantity-${i}" disabled aria-describedby="saisie quantité" oninput="updatePrice(value, ${i}), validity.valid||(value=' ')" value="${item.quantity}" min="1" max="20">
                        <small id="itemErrorMessage-${i}" class="form-text text-muted"></small>
                    </td>
                    <td class="text-center align-middle" id="updated-price-${i}">${item.totalPrice}</td>
                    <td class="text-center">
                        <button onclick="deleteItem(${i})" class="btn btn-outline-danger deleteItemBtn" id="deleteItemBtn">
                            <!-- <img class="red" src="./assets/icons/corbeille.svg" width="17px"alt="bouton supprimer produit"> -->
                            <i class="fa fa-trash" aria-hidden="true"></i>
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
function deleteItem (index) {
    cartStorage.splice(index, 1)
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    document.getElementById('cartTable').innerHTML = showCart()
    document.getElementById('totalPrice').innerHTML = calculateTotalPrice()

    if (cartStorage.length === 0){
        deleteAllCart()
    }
}

/******************* delete all items from cart *******************/
function deleteAllCart () {
    localStorage.removeItem('OrinocoCart')
}
// deleteAllCart()

/******************* update item price *******************/
function updatePrice (newQuantity, index) {
    let price = cartStorage[index].price
    let newTotalPrice =  parseInt(price) * parseInt(newQuantity)
    let newItem = Object.assign (cartStorage[index], {'quantity' : newQuantity, 'totalPrice' : newTotalPrice}) // change la quantite de l'element dans cartStorage (selectionne grace à l'index)
    Object.entries(newItem) //transform l'objet newItem en array
    cartStorage.splice(index, 1, newItem) // remplace l'ancien array à l'index par newItem
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    document.getElementById('totalPrice').innerHTML = calculateTotalPrice()
    document.getElementById(`updated-price-${index}`).innerHTML = newTotalPrice  //écrit le nouveau prix total du produit en fonction de sa quantité
}

/******************* calculate total price *******************/
function calculateTotalPrice () {
    totalPrice = 0
    for(i in cartStorage){
        let item = cartStorage[i]
        totalPrice += item.price * item.quantity
        console.log(cartStorage)
    }

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
let contactForm = document.getElementById('contact-form')
contactForm.addEventListener('change', function() {
    if (contactForm.checkValidity() && totalPrice > 0){
        console.log("saisies tous validée")
        submitBtn.removeAttribute("disabled", false);
    }
    else {
        console.log("Il faut recommencer !")
        submitBtn.setAttribute("disabled", true);
    }
})

/******************* send form datas *******************/
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

/******************* send form datas when click *******************/
submitBtn.addEventListener('click', function(e) {
    e.preventDefault()
    sendOrder()
})

window.load = document.getElementById('cartTable').innerHTML = showCart()
window.load = document.getElementById('totalPrice').innerHTML = calculateTotalPrice()

/******************* activate changing quantity *******************/
if ( inputQuantityActivated === true) {
    for(let i in cartStorage) {
        document.getElementById(`itemQuantity-${i}`).removeAttribute("disabled")
    }
} 



console.log(cartStorage)

// console.log(JSON.parse(sessionStorage.getItem('OrinocoOrderConfirmation')))
// sessionStorage.removeItem('OrinocoOrderConfirmation')



//  si quantité non valide, a finir ? 
    for(let i in cartStorage) {
        let itemErrorMessage = document.getElementById(`itemErrorMessage-${i}`)
        // let email = document.getElementById("email")
        console.log(itemErrorMessage)
        itemErrorMessage.addEventListener('click', function() {
            console.log("fonctionne")
            if (itemErrorMessageckValidity()){
                document.getElementById('itemErrorMessage').innerHTML = "Toutes vos données sont sécurisées."
            }
            else {
                document.getElementById('itemErrorMessage').innerHTML = "❌ Veuillez rentrer une adresse mail valide.  exemple:  bernard@hotmail.fr"
            }
        })
    }
