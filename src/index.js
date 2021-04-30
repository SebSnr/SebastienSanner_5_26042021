// js from index.html

import "../assets/stylesheets/styles.scss";
        
const maincontent = document.getElementById('maincontent')

getProductsHarray ()
// productsCard (0, "teddy l'ourson", 50)

// get products list
function getProductsHarray () {
fetch('http://localhost:3000/api/teddies')
    .then(
        function (productsHarray) {
            if (productsHarray.status !== 200) {
                console.log("API issue : code ${productsHarray.status}")
                return
            }

            productsHarray.json().then(function(data){
                console.log(data[0])
                console.log(data[0].imageUrl)
                console.log(data[0].name)
                
                productsCard (data[0].imageUrl, data[0].name, data[0].price) //affiche la card avec les infos du back end

                // productsHarrayInLet (data[0])
            })
        }
    )
    .catch(
        function(err) {
            console.log("fetch error", err)
        }
    )
}

function productsHarrayInVariable (data) {
    // let personnalisation = data.colors
    let productName = data.name
    
    console.log (productName)

}

function productsCard (imgURL, name, price){
    //  div row
    let productsListDiv = document.createElement('div')
    productsListDiv.className = 'row'
    maincontent.appendChild(productsListDiv)

    // div card col
    let cardColDiv = document.createElement('div')
    productsListDiv.appendChild(cardColDiv)
    cardColDiv.className = 'col-12 col-lg-4 mb-4'

    // div card
    let cardDiv = document.createElement('div')
    cardColDiv.appendChild(cardDiv)
    cardDiv.className = 'card shadow'

    // img card
    let cardImg = document.createElement('img')
    cardDiv.appendChild(cardImg)
    cardImg.className = 'card-img-top'
    cardImg.getAttribute = 'src alt'
    cardImg.src = imgURL
    cardImg.alt = `photo produit ${name}`

    // div card body
    let cardBody = document.createElement('div')
    cardDiv.appendChild(cardBody)
    cardBody.className = 'card-body d-flex flex-wrap justify-content-around'

    // h2 product name
    let productName = document.createElement('h2')
    cardBody.appendChild(productName)
    productName.className = 'card-title h5'
    productName.innerHTML = name

    // span product price
    let productPrice = document.createElement('span')
    cardBody.appendChild(productPrice)
    productPrice.className = 'card-text' 
    productPrice.innerHTML = price

    //  a link product
    let productLink = document.createElement('a')
    cardBody.appendChild(productLink)
    productLink.className = 'stretched-link'
    productLink.getAttribute = 'href'
    productLink.href = "#"  // mettre lien de la fiche produit
    productLink.style.width = 0

}

