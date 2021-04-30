// js from index.html

import "../assets/stylesheets/styles.scss";
 
function active() {return "hello main content !"};
document.write("Bonjour ici index.js !");      
        
const maincontent = document.getElementById('maincontent')
maincontent.innerHTML = active()


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
            })
        }
    )
    .catch(
        function(err) {
            console.log("Fetch error", err)
        }
    )
}

getProductsHarray ()