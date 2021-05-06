
import "../assets/stylesheets/styles.scss"


import {showProduct2} from "./screens/homeScreen"



const router = async function() {
    const mainContent = document.getElementById('maincontent')
    mainContent.innerHTML = await showProduct2.render()
}

window.addEventListener('load', router);

