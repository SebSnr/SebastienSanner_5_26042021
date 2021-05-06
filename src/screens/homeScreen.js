import { data } from "autoprefixer";
import {getProductList} from "../api"   

// console.log (getProductList())
// await console.log (getProductList)


export const showProduct2 = {
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
                                        <a href="" class="stretched-link"></a>
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


// getProductList().then(data => {
//         //   console.log ("data")
//       })
// const someFunc = () => {
//     getProductList().then(data => {
//         /* do what you want to do in promise resolve callback function */
//         // console.log(data)
//     })
//  }
//  someFunc()