
/******************* get product details *******************/

const createUrl = async () => {
    let url = window.location
    // alert("Hello!");
    console.log("salut les moches")
}


createUrl()


const getProduct = function () {
    return fetch('http://localhost:3000/api/teddies')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }
                return response.json()
                    .then(function(data){
                        const mainContent = document.getElementById('main-content')
                        mainContent.innerHTML = "Bonsoir"
                        
                    })
            } 
        )
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}



const showProductDetails = () => {

}


getProduct()