//******** js from index.html ************//

import "../assets/stylesheets/styles.scss";
import { getProductList } from "./api";
import showProduct from "./screens/homeScreen";

let data = getProductList ()
showProduct (getProductList)








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
