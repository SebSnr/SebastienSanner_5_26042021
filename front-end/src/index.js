
let productList
let category = "Teddies"

/******************* get products list *******************/
const getProductList = function () {
    return fetch(`http://localhost:3000/api/${category}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }
                return response.json()
                    .then(function(data){
                        const mainContent = document.getElementById('main-content')
                        mainContent.innerHTML = showProducts(data)
                        
                    })
            } 
        )
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}


/******************* show product cards *******************/
const showProducts = function (productList) {
    if (productList.error) {
        console.log ("error :", error)
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
                                <span class="card-text">${productList[product].price}</span>
                            </div>
                        </div>
                    </div>
        `
    }
    let content = `<h1 class="my-5">${category}</h1><div class="row"> ${productCards} </div>`
    return content
}

getProductList()

