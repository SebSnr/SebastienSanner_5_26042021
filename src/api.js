
// get products list
export const getProductList = function () {
    fetch('http://localhost:3000/api/teddies')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }

                response.json().then(function(data){
                    for (let product of data) {
                        // showProduct (product.imageUrl, product.name, product.price) //affiche la card avec les infos du back end    
                        
                    }
                    console.log(data)
                    return data
                })
            }
        )
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}

// generate product URL
function generateProductURL (productName) {
    let url =  (`Teddies-${productName}.html`)    // modifier le lien url ?? 
    return url
}