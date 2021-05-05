import { data } from "autoprefixer";
import {getProductList} from "../api"   

// console.log (getProductList())
// await console.log (getProductList)


export const showProduct2 = {
    render : async function () {
        // let productlist = getProductList()
        // productlist.then(function (data){console.log(data.[0].name)});
        let productList = await getProductList()
        // console.log(productList[0])

        if (productList.error) {
            console.log ('erreur de la product list dans HomeScreen')
        }

        let productCardHTML =             `
                <div class="row">
                        <div class="col-12 col-lg-4 mb-4">
                            <div class="card h-100 rounded-6 shadow">
                                <img src="${productList[0].imageUrl}" alt="" class="card-img-top">
                                <div class="card-body d-flex flex-wrap justify-content-between">
                                    <h2 class="card-title h5">${productList[0].name}</h2>
                                    <a href="" class="stretched-link"></a>
                                    <span class="card-text">${productList[0].price}</span>
                                </div>
                            </div>
                        </div>
                </div>
            `
        

        // console.log(productCardHTML)

        let resultat = () => {
            let result = ""
            for(let element in productList){
               result += `
               <div class="row">
                       <div class="col-12 col-lg-4 mb-4">
                           <div class="card h-100 rounded-6 shadow">
                               <img src="${productList[element].imageUrl}" alt="" class="card-img-top">
                               <div class="card-body d-flex flex-wrap justify-content-between">
                                   <h2 class="card-title h5">${productList[element].name}</h2>
                                   <a href="" class="stretched-link"></a>
                                   <span class="card-text">${productList[element].price}</span>
                               </div>
                           </div>
                       </div>
               </div>
           `
            }
            return result

        }
        
        // console.log(resultat())
        

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