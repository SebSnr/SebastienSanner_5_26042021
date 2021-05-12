
let cartStorage = JSON.parse(localStorage.getItem('OrinocoCart'))

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
                            <a class="thumbnail " href="product.html#${item.Id}"><img class="media-object" src="${item.imageUrl}" height="80px"></a>
                        </div>
                    </td>
                    <td lass="text-left align-middle">${item.name}</td>
                    <td class="text-center align-middle">
                        <input type="number" class="form-control col-2 itemQuantity" aria-describedby="saisie quantité" oninput="updatePrice(value, ${i}), validity.valid||(value=' ')" value="${item.quantity}" min="1" max="20">
                    </td>
                    <td class="text-center align-middle">${item.totalPrice}</td>
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

/******************* calculate total price *******************/
function calculateTotalPrice () {
    let totalPrice = 0
        for(i in cartStorage){
            let item = cartStorage[i]
            totalPrice += item.price * item.quantity
        }
    return `
        <td class="text-center"><h3>Prix total</h3></td>
        <td class="text-left"><h3>${totalPrice} €</h3></td>
            <td><h3> &nbsp; </h3></td>
    `
}

/******************* update item price *******************/
function updatePrice (newQuantity, index) {
    let price = cartStorage[index].price
    let newTotalPrice =  parseInt(price) * parseInt(newQuantity)
    let newItem = Object.assign (cartStorage[index], {'quantity' : newQuantity, 'totalPrice' : newTotalPrice}) // change la quantite de l'element dans cartStorage (selectionne grace à l'index)
    Object.entries(newItem) //transform l'objet newItem en array
    cartStorage.splice(index, 1, newItem) // remplace l'ancien array à l'index par newItem
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    document.getElementById('totalPrice').innerHTML = calculateTotalPrice()
}




window.load = document.getElementById('cartTable').innerHTML = showCart()
window.load = document.getElementById('totalPrice').innerHTML = calculateTotalPrice()

console.log(cartStorage)


/******************* validate email *******************/
function validateEmail() {
    let email = document.getElementById("email")
    let emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailCheck.test(email.value)
}
    
email.addEventListener('input', function() {
    let submitBtn = document.getElementById("submit-btn")
    if(validateEmail()) {
        document.getElementById('emailHelp').innerHTML = "Toutes vos données sont sécurisées."
        submitBtn.removeAttribute("disabled", false);
    } 
    else {
        document.getElementById('emailHelp').innerHTML = "❌ Veuillez rentrer une adresse mail valide.  exemple:  bernard@hotmail.fr"
        submitBtn.setAttribute("disabled", true);

    }
})


/******************* disable submit btn *******************/
function disableSubmit (disabled) {
    let submitBtn = document.getElementById("submit-btn")
    if (disabled) {
        submitBtn.setAttribute("disabled", true);
    } else {
        submitBtn.removeAttribute("disabled", false);
    }
}

/******************* validate all inputes before submit *******************/
// function validateInputes () {
//     validateEmail()
//     console.log(validateEmail())
//     let submitBtn = document.getElementById("submit-btn")
//     if (validateEmail() == true){
//         console.log("ca passe")
//         submitBtn.removeAttribute("disabled", false);
//     }
// }


// validateInputes ()

