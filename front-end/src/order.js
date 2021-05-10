
let cart = JSON.parse(localStorage.getItem('cart'))

function showCart () {
    let productItem = ""
    for(i in cart){
        let item = cart[i]
        productItem += `
        
            <tr class="align-middle">
                <td>
                    <div class="media text-left align-middle">
                        <a class="thumbnail " href="#"><img class="media-object" src="${item.imageUrl}" height="80px"></a>
                    </div>
                </td>
                <td lass="text-left align-middle">${item.name}</td>
                <td class="text-center align-middle">
                    <input type="number" class="form-control col-2" id="quantity" aria-describedby="saisie quantité" value="${item.quantity}">
                </td>
                <td class="text-center align-middle">$14.61</td>
                <td class="text-center">
                    <button type="button" class="btn btn-outline-danger deleteItemBtn">
                        <!-- <img class="red" src="./assets/icons/corbeille.svg" width="17px"alt="bouton supprimer produit"> -->
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>

        `
        // console.log(item.productId)
    }

    return productItem
}

function deleteItem (index) {

    console.log("Bravo la valeur a été supprimé")
            
    cart.splice(index, 1)   //doit supprimer, splice prends normalement 3 arg

    showCart()

    console.log("rien ne se passe de plus ? ")
}

function deleteAllCart () {
    localStorage.removeItem('cart')
}
// deleteAllCart()


document.getElementById('cartTable').innerHTML = showCart(cart)

// let deleteItemBtn = document.getElementsByClassName('deleteItemBtn')
// deleteItemBtn.addEventListener('click', function(e){
// })

console.log(JSON.parse(localStorage.getItem('cart')))
