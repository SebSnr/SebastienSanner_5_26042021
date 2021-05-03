

const mainContent = document.getElementById('maincontent')

//  div row
let productsListDiv = document.createElement('div')
productsListDiv.className = 'row'
mainContent.appendChild(productsListDiv)

function showProduct (imgURL, name, price){

    
    // div card col
    let cardColDiv = document.createElement('div')
    productsListDiv.appendChild(cardColDiv)
    cardColDiv.className = 'col-12 col-lg-4 mb-4'
    
    // div card
    let cardDiv = document.createElement('div')
    cardColDiv.appendChild(cardDiv)
    cardDiv.className = 'card h-100 rounded-6 shadow'
    
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
    
    //  a product link
    // let productURL = generateProductURL(name)
    // let productLink = document.createElement('a')
    // cardBody.appendChild(productLink)
    // productLink.className = 'stretched-link'
    // productLink.getAttribute = 'href'
    // productLink.href = `${productURL}`      // mettre lien de la fiche produit
    // productLink.style.width = 0

    // span product price
    let productPrice = document.createElement('span')
    cardBody.appendChild(productPrice)
    productPrice.className = 'card-text' 
    productPrice.innerHTML = price
    
}


export default showProduct