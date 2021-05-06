/******************* get products list *******************/
const getProductList = async function () {
    return fetch('http://localhost:3000/api/teddies')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }

                return response.json()
                    .then(function(data){
                        // console.log(data)
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

/******************* show product cards *******************/
export const showProduct = {
    render : async function () {
        // productlist.then(function (data){console.log(data.[0].name)});
        // console.log(productList[0])
        let productList = await getProductList()

        if (productList.error) {
            console.log ('erreur de la product list dans HomeScreen')
        }

        let resultat = () => {
            let productCards = ""
            for(let element in productList){
                productCards += `
                            <div class="col-12 col-lg-4 mb-4">
                                <div class="card h-100 rounded-6 shadow">
                                    <img src="${productList[element].imageUrl}" alt="photo du produit" class="card-img-top">
                                    <div class="card-body d-flex flex-wrap justify-content-between">
                                        <h2 class="card-title h5">${productList[element].name}</h2>
                                        <a id="bouttona" href="/public/product.html#${productList[element]._id}" class="stretched-link"></a>
                                        <span class="card-text">${productList[element].price}</span>
                                    </div>
                                </div>
                            </div>
                `
            }
            let rowContent = `<div class="row"> ${productCards} </div>`
            return rowContent
        }
        return resultat()
    }
}
