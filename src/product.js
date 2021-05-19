// get product id from url 
let productId = document.location.hash.replace('#', '')

/******************* get product details from API *******************/
// use fetch and get method for download product data from server 
// if response by the server, render the result with the function 
// if no response, return the error //
function getProductDetails () {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then(function (response) {
            if (response.status !== 200) {
                console.log("API issue : code ${response.status}")
                return
            }
            return response.json()

            .then(function(data){
                document.getElementById('main-content').innerHTML = showProductDetails(data)
                document.getElementById('addCartButton').addEventListener('click', () => addCart(data))
            })
        })
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}

/******************* render product page content *******************/
// create and then render the result in HTML //
// if error, return the error //

function showProductDetails (product) {
    if (product.error) {
        console.log ("error :" , error)
    }

    // create the option list
    let createOptionList = (list) => {
        selectLine =""
        for (let option in list){
            selectLine += `<option>${list[option]}</option>`
        } 
        return selectLine
    }
 
    return `
        <div class="row my-5 d-flex align-items-center">

            <div class="col-12 col-lg-6 mb-4 mb-lg-0">
                <img src="${product.imageUrl}" alt="photo du produit" class="img-fluid rounded shadow">
            </div>

            <div class="col-lg-1"></div>

            <div class="col-12 col-lg-4">
                <h2 class="card-title h2">${product.name}</h2>
                <span><big>${product.price} €</big></span>
                <br><br>
                <select>
                    ${createOptionList(product.colors)}
                </select>
                <br><br><br>
                <table>
                    <tr>
                        <td class="col-1">
                            <label for="productName">quantité</label>
                        </td>
                        <td class="col-3">
                            <input type="number" class="form-control col-2" id="quantity" aria-describedby="saisie quantité" value="1">
                        </td>
                        <td class="col-1">

                        </td>
                        <td class="col-7">
                            <a href="./order.html" type="button" class="btn btn-success col-12" id="addCartButton">
                                Acheter
                            </a>
                        </td>
                    </tr>
                </table>
                <br><br>
                <p>${product.description}</p>
            </div>

            <div class="col-lg-1"></div>
        </div>
    `
}

/******************* add product to cart *******************/
// if the item is already in the cart in the local storage
    // remplace the quantity and total price of the item in the cart
// if no product in the cart or the item not already in
    // add the product data in the local storage

function addCart (product) {
    let quantity = document.getElementById('quantity').value
    let totalPrice = quantity * product.price
    let cartStorage = []
    let itemNotExist

    // check if cart already exist in the local storage
    if (localStorage.getItem('OrinocoCart')){
        cartStorage = JSON.parse(localStorage.getItem('OrinocoCart'));
        
        // check in the cart if the item is in it
        for(i in cartStorage){
            let item = cartStorage[i]
            if (item.name === product.name) { 
                let newQuantity = parseInt(quantity) + parseInt(item.quantity)
                let newTotalPrice = parseInt(totalPrice) + parseInt(item.totalPrice)
                
                // if alreay in, remplace the quantity and total price of the item
                let newItem = Object.assign (cartStorage[i], {'quantity' : newQuantity, 'totalPrice' : newTotalPrice}) // change the quantity of the item on index i in cartStorage
                Object.entries(newItem) //transform objet newItem in array
                cartStorage.splice(i, 1, newItem) // remplace the array at index i by the new one newItem
                localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
                itemNotExist = cartStorage[i].includes(product.name)
            }
        }         
    }

    // if the item not already in the cart, add it
    if (itemNotExist = true){
    cartStorage.push({'quantity' : quantity, 'totalPrice' : totalPrice, 'Id' : product._id, 'name' : product.name, 'price' : product.price, 'imageUrl' : product.imageUrl, 'description' : product.description})
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    }
}

// call the function when page loading 
window.load = getProductDetails()

