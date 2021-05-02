//******** js from index.html ************//

import "../assets/stylesheets/styles.scss";

const mainContent = document.getElementById('maincontent')

//  div row
let productsListDiv = document.createElement('div')
productsListDiv.className = 'row'
mainContent.appendChild(productsListDiv)

// get products list
fetch('http://localhost:3000/api/teddies')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log("API issue : code ${response.status}")
                return
            }

            response.json().then(function(data){
                    for (let i = 0; i < data.length; i++ ) {
                    showProduct (data[i].imageUrl, data[i].name, data[i].price) //affiche la card avec les infos du back end    
                }
            })
        }
    )
    .catch(
        function(err) {
            console.log("fetch error", err)
        }
    )

function showProduct (imgURL, name, price){

    // div card col
    let cardColDiv = document.createElement('div')
    productsListDiv.appendChild(cardColDiv)
    cardColDiv.className = 'col-12 col-lg-4 mb-4'

    // div card
    let cardDiv = document.createElement('div')
    cardColDiv.appendChild(cardDiv)
    cardDiv.className = 'card rounded-6 shadow'

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
    cardBody.className = 'card-body d-flex flex-wrap justify-content-between'

    // h2 product name
    let productName = document.createElement('h2')
    cardBody.appendChild(productName)
    productName.className = 'card-title h5'
    productName.innerHTML = name

    //  a link product
    let productLink = document.createElement('a')
    cardBody.appendChild(productLink)
    productLink.className = 'stretched-link'
    productLink.getAttribute = 'href'
    productLink.href = "#"  // mettre lien de la fiche produit
    productLink.style.width = 0

    // span product price
    let productPrice = document.createElement('span')
    cardBody.appendChild(productPrice)
    productPrice.className = 'card-text' 
    productPrice.innerHTML = price

}















// function créer un élément div etc avec class mais problème de append l'enfant 
// createElementwithClass ("h1", "h2", mainContent )
function createElementwithClass (element, newClass, elementParent) {
    let newElement = document.createElement(element)
    newElement.className = newClass
    elementParent.appendChild(newElement)
    console.log (newElement)
}

