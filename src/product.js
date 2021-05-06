import "../assets/stylesheets/styles.scss"

/******************* get product details *******************/


const createUrl = async () => {
    let url = window.location
    alerte (bonjour)
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
const routerr = async function() {
    const mainContentProduct = document.getElementById('main-content-product')
    mainContentProduct.innerHTML = 'chalut'

}
routerr()
// window.addEventListener('load', router());


