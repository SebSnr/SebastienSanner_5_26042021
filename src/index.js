
import "../assets/stylesheets/styles.scss"


import {showProduct2} from "./screens/homeScreen"



const router = async function() {
    const mainContent = document.getElementById('maincontent')
    mainContent.innerHTML = await showProduct2.render()
}

window.addEventListener('load', router);



 






// getProductList()
// console.log(getProductList)

// getProductList().then(data => {
//     console.log(data)
// })

// function afficherData (){
//     const res = getProductList.then()
//     if (res.status == 200)
//     {
//         console.log("error 201")
//     }
//     else
//     {
//         console.log("succès")
//     }

// }

// afficherData()





// function créer un élément div etc avec class mais problème de append l'enfant 
// createElementwithClass ("h1", "h2", mainContent )
function createElementwithClass (element, newClass, elementParent) {
    let newElement = document.createElement(element)
    newElement.className = newClass
    elementParent.appendChild(newElement)
    console.log (newElement)
}
// let divExemple = createElementwithClass ('div', 'alt', mainContent)
// let divExemple2 = createElementwithClass ('div', 'src', mainContent.children)
