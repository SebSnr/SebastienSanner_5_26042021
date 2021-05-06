
import "../assets/stylesheets/styles.scss"

import {showProduct} from "./homePage"

const router = async function() {
    const mainContent = document.getElementById('maincontent')
    mainContent.innerHTML = await showProduct.render()
}

window.addEventListener('load', router);


