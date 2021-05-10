
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
                        //si click sur bouton
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
                                <input type="number" class="form-control col-2" id="quantity" aria-describedby="saisie quantité" value="1">
                            </td>
                            <td class="col-1">

                            </td>
                            <td class="col-7">
                                <a href="./order.html" type="button" class="btn btn-success col-12" id="addCart">
                                    Acheter
                                </a>
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
    
    let quantity = document.getElementById('quantity').value //  update

    let storageAdress = localStorage.getItem('OrinocoBasket')
    let storageData = JSON.parse(storageAdress)


    // si aucun élément déjà ajouté dans le local storage, alors créer un array OrinocoBasket dans le local storage
    if (storageAdress == null) {
        let itemsList = [[product, quantity]]
        localStorage.setItem('OrinocoBasket', JSON.stringify(itemsList))
    }

    else {
        // si l'élément existe déjà dans le array du local storage, alors remplacer cet élément par le nouveau
        // if (storageData[0][0].name) {


        if (storageData[0][0].name.includes(product.name)) { // a changer
            
            console.log("Bravo la valeur existe déjà")
            
            let newStorageData = storageData.splice(storageData[0], 1, [product, quantity])
            localStorage.setItem ('OrinocoBasket', JSON.stringify(newStorageData))  
            
            console.log (storageData)
            
            
        }
        
        // sinon ajouter le produit et la quantité selectionné dans le array déjà créé dans le local storage
        else {
            let existingLocalStorage = storageData
            existingLocalStorage.push([product, quantity])
            localStorage.setItem ('OrinocoBasket', JSON.stringify(existingLocalStorage))  
        }
    }
    
    // console.log (storageData)
}

const DeleteFromCart = () => {

    console.log("Bravo la valeur a été supprimé")
            
    let newStorageData = storageData.splice(storageData[0], 1, )   //doit supprimer, splice prends normalement 3 arg
    localStorage.setItem ('OrinocoBasket', JSON.stringify(newStorageData))  
    
    console.log (storageData)

}

const deleteCart = () => {
    localStorage.removeItem('OrinocoBasket')

}

// let a = voir[0][0]._id //voir l'id du produit

console.log(JSON.parse(localStorage.getItem('OrinocoBasket')))











