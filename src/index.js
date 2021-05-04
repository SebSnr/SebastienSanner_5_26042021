
import "../assets/stylesheets/styles.scss"


import {b, showProduct2} from "./screens/homeScreen"
console.log (b)
console.log (showProduct2())



const mainContent = document.getElementById('maincontent')

mainContent.innerHTML = showProduct2()


// import { cube, machin, b } from './screens/homeScreen'
// console.log(cube(3)); // 27
// console.log(machin);    // 4.555806215962888


 






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
