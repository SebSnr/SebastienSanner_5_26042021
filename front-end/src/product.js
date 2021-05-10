
/******************* get product ID from url *******************/
    let productId = document.location.hash.replace('#', '')

/******************* get product details *******************/
const getProductDetails = () => {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("API issue : code ${response.status}")
                    return
                }
                return response.json()
                    .then(function(data){
                        const mainContent = document.getElementById('main-content')
                        mainContent.innerHTML = showProductDetails(data)
                        console.log(data)
                        let addCartBtn = document.getElementById('addCart')
                        addCartBtn.addEventListener('click', function(e){
                            addCart(data)

                        })
                    })
            } 
        )
        .catch(
            function(err) {
                console.log("fetch error", err)
            }
        )
}

const showProductDetails = (product) => {
    if (product.error) {
        console.log ("error :" , error)
    }

    let createOptionList = (list) => {
        selectLine =""
        for (let option in list){
            selectLine += `<option>${list[option]}</option>`
        } 
        return selectLine
    }

    return `
        <div class="row my-5 d-flex align-items-center">

            <div class="col-12 col-lg-6 mb-4 mb-lg-0">
                <img src="${product.imageUrl}" alt="photo du produit" class="img-fluid rounded shadow">
            </div>

            <div class="col-lg-1"></div>

            <div class="col-12 col-lg-4">
                <h2 class="card-title h2">${product.name}</h2>
                <span><big>${product.price} €</big></span>
                <br><br>
                <select>
                ${createOptionList(product.colors)}
                </select>
                <br><br><br>
                <form>
                    <table>
                        <tr>
                            <td class="col-1">
                                <label for="productName">quantité</label>
                            </td>
                            <td class="col-3">
                                <input type="number" class="form-control col-2" id="productName" aria-describedby="saisie quantité" value="1">
                            </td>
                            <td class="col-1">

                            </td>
                            <td class="col-7">
                                <button type="button" class="btn btn-success col-12" id="addCart">
                                    Ajouter au panier 
                                </button>
                            </td>
                        </tr>
                    </table>
                </form>
                <br><br>
                <p>${product.description}</p>
            </div>

            <div class="col-lg-1"></div>
        </div>
    `
}


getProductDetails()


// Quand je click sur bouton, je crée un tableau dans le local storage
//si tableau déjà présent,je rajouter un ligne 

const addCart = (product) => {
    let quantity = 9 //  update

    // si aucun élément déjà ajouté dans le local storage, alors créer un array OrinocoBasket dans le local storage
    if (window.localStorage.getItem('OrinocoBasket') == null) {
        let itemsList = [[product, quantity]]
        window.localStorage.setItem('OrinocoBasket', JSON.stringify(itemsList))
    }
    // sinon ajouter le produit et la quantité selectionné dans le array déjà créé dans le local storage
    else {
        let existingLocalStorage = JSON.parse(window.localStorage.getItem('OrinocoBasket'))
        existingLocalStorage.push([product, quantity])
        window.localStorage.setItem ('OrinocoBasket', JSON.stringify(existingLocalStorage))  
    }
    
    console.log (JSON.parse(window.localStorage.getItem('OrinocoBasket')))
}


// pour mes vérifications perso sur console.log
// let voir = JSON.parse(window.localStorage.getItem('OrinocoBasket'))
window.localStorage.removeItem('OrinocoBasket')
// let a = voir[0][0]._id //voir l'id du produit
// console.log (a)
// console.log (voir)
console.log (JSON.parse(window.localStorage.getItem('OrinocoBasket')))












