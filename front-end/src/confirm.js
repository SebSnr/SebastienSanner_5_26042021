let orderInformations = JSON.parse(sessionStorage.getItem('OrinocoOrderConfirmation'))

//>>>>>>>>>> For activate changing quantity <<<<<<<<<<<<<<<<
let inputQuantityActivated = true   //>> change by true to enable quantity input in this page


/******************* render confirmation message *******************/
function getOrderInformations () {

    if(orderInformations){

        let totalPrice = 0

        // Activate changing quantity
        if (inputQuantityActivated === true){
            let orderTotalPriceWithQuantityChanged = JSON.parse(sessionStorage.getItem('OrinocoTotalPriceOrder'))
            totalPrice = orderTotalPriceWithQuantityChanged
        }
        else {
            for(i in orderInformations.products){
                let item = orderInformations.products[i]
                totalPrice += item.price
            }
        }

        let confirmationMessage = `
            <div class="text-center">
                <img src="./assets/icons/checkmark.svg" alt="Commande approuvé" class="confirm-img" >
            </div>
            <div class="text-center">
                <p class="h1">Félicitation ${orderInformations.contact.firstName} !</p>
                <br>
                <p><big>Votre commande a bien été enregistré.</big></p>
                <p>Nous vous remercions de votre confiance.</p>
                <br>
                <p><big><span class="font-weight-bold">Commande n° ${orderInformations.orderId}</span><br>d'un montant total de ${totalPrice}€</big></p>
            </div>
        `
        document.getElementById('main-content').innerHTML = confirmationMessage
    }
    else {
        let errorMessage = `
            <div class="text-center">
            <img src="./assets/icons/Warning.svg" alt="Commande approuvé" class="confirm-img" >
                </div>
                <div class="text-center">
                    <p class="h1">Erreur commande</p>
                    <br>
                    <p><big>Votre commande n'a pas abouti.</big></p>
                    <p>Nous vous invitons à renouveller votre commande.</p>
                </div>
        `
        document.getElementById('main-content').innerHTML = errorMessage
    }
}

window.load = getOrderInformations()