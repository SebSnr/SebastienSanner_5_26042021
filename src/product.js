// import "../assets/stylesheets/styles.scss"

/******************* get product details *******************/


const createUrl = async () => {
    let url = window.location
    // alert("Hello!");
    console.log("salut les moches")
}


createUrl()




const getProduct = async () => {
    return fetch('url')
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



const renderProduct = async () => {

}



/******************* insert all HTML code *******************/
const productRoot = async function() {
    const mainContentProduct = document.getElementById('main-content-product')
    mainContentProduct.innerHTML = 'chalut'
}
console.log(window.location.pathname)
// console.log(window.location.pathname)
if (window.location.pathname === "/public/product.html"){
    productRoot()}
// if (window.location.pathname === "/public/index.html"){
// window.addEventListener('onload', router())}

