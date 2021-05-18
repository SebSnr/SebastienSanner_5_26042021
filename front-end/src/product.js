//>>>>>>>>>> For activate changing quantity <<<<<<<<<<<<<<<<
let activatedInputQuantity = true //>> change by true to enable quantity input in this page


/******************* get product ID from url *******************/
let productId = document.location.hash.replace('#', '')

/******************* get product details from API *******************/
const getProductDetails = () => {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }
                return response.json()
                    .then(function(data){
                        document.getElementById('main-content').innerHTML = showProductDetails(data)
                        document.getElementById('addCartButton').addEventListener('click', () => addCart(data))
                    })
            } 
        )
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}

/******************* render product page content *******************/
const showProductDetails = (product) => {
    if (product.error) {
        console.log ("error :" , error)
    }

    let createOptionList = (list) => {
        selectLine =""
        for (let option in list){
            selectLine += `<option>${list[option]}</option>`
        } 
        return selectLine
    }

    // Activate changing quantity
    let disabled
    if (activatedInputQuantity === true){
        disabled = ""
    }
    else {
        disabled = "disabled"
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
                            <input type="number" class="form-control col-2" id="quantity" aria-describedby="saisie quantité" value="1" ${disabled}>
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

function addCart (product) {
    let quantity = document.getElementById('quantity').value
    let totalPrice = quantity * product.price
    let cartStorage = []
    let itemNotExist

    if (localStorage.getItem('OrinocoCart')){
        cartStorage = JSON.parse(localStorage.getItem('OrinocoCart'));
            
        for(i in cartStorage){
            let item = cartStorage[i]
            if (item.name === product.name) { 
                let newQuantity
                let newTotalPrice

                // Activate changing quantity
                if (activatedInputQuantity === true){
                    newQuantity = parseInt(quantity) + parseInt(item.quantity)
                    newTotalPrice = parseInt(totalPrice) + parseInt(item.totalPrice)
                }
                else {
                    newQuantity = 1
                    newTotalPrice = totalPrice
                }

                let newItem = Object.assign (cartStorage[i], {'quantity' : newQuantity, 'totalPrice' : newTotalPrice}) // change la quantite de l'element dans cartStorage (selectionne grace à i)
                Object.entries(newItem) //transform l'objet newItem en array
                cartStorage.splice(i, 1, newItem) // remplace l'ancien array à l'i par newItem
                localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
                itemNotExist = cartStorage[i].includes(product.name)
            }
        }         
    }

    if (itemNotExist = true){
    cartStorage.push({'quantity' : quantity, 'totalPrice' : totalPrice, 'Id' : product._id, 'name' : product.name, 'price' : product.price, 'imageUrl' : product.imageUrl, 'description' : product.description})
    localStorage.setItem('OrinocoCart', JSON.stringify(cartStorage))
    }
}

window.load = getProductDetails()

console.log(JSON.parse(localStorage.getItem('OrinocoCart')))
