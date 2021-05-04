import {getProductList} from "../api"   

console.log (getProductList())
await console.log (getProductList)

export const showProduct2 = function(){
    return `
        <div class="row">
                <div class="col-12 col-lg-4 mb-4">
                    <div class="card h-100 rounded-6 shadow">
                        <img src="" alt="" class="card-img-top">
                        <div class="card-body d-flex flex-wrap justify-content-between">
                            <h2 class="card-title h5"></h2>
                            <a href="" class="stretched-link"></a>
                            <span class="card-text"></span>
                        </div>
                    </div>
                </div>
        </div>
    `
}

export let b = 25

