
let productList
let category = "Teddies"

/******************* get products list *******************/
// use fetch and get method for download products data from server 
// if response by the server, render the result with the function 
// if no response, return the error 

function getProductList () {

    const mainContent = document.getElementById('main-content')

    return fetch(`http://localhost:3000/api/${category}`)
        .then( function (response) {
            if (response.status !== 200) {
                console.log("API issue : code ${response.status}")
                return
            }
            return response.json()
            
            .then(function(data){
                mainContent.innerHTML = showProducts(data)
                
            })
        })
        .catch(
            function(err) {
                console.log("fetch error", err)
                mainContent.innerHTML = `<div class="text-center "><h3 classe="my-5">Veuillez rafraîchir la page ultérieurement. <br>Un problème est survenue lors du chargement des données.</h3></div>`
            }
        )
}

/******************* show product cards *******************/
// create card for the different products and render the result in HTML 
// if error, return the error 

function showProducts (productList) {

    if (!productList){
        console.log("error : no data received from fetch")
    }

    let productCards = ""
    for(let product in productList){
        productCards += `
                    <div class="col-12 col-lg-4 mb-4">
                        <div class="card h-100 rounded shadow">
                            <img src="${productList[product].imageUrl}" alt="photo du produit" class="card-img-top">
                            <div class="card-body d-flex flex-wrap justify-content-between">
                                <h2 class="card-title h5">${productList[product].name}</h2>
                                <a href="product.html#${productList[product]._id}" class="stretched-link"></a>
                                <span class="card-text">${productList[product].price} €</span>
                            </div>
                        </div>
                    </div>
        `
    }
    let content = `<h1 class="my-5">${category}</h1><div class="row"> ${productCards} </div>`
    return content
}

// call the function when page loading 
window.load = getProductList()