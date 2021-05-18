
let orderInformations = JSON.parse(sessionStorage.getItem('OrinocoOrderConfirmation'))

/******************* render confirmation message *******************/
function getOrderInformations () {

    if(orderInformations){

        let totalPrice = 0
        for(i in orderInformations.products){
            let item = orderInformations.products[i]
            totalPrice += item.price
        }    

        let confirmationMessage = `
            <div class="text-center">
                <img src="./assets/icons/checkmark.svg" alt="Commande approuvé" class="confirm-img" >
            </div>
            <div class="text-center">
                <p class="h1">Félicitation ${orderInformations.contact.firstName} !</p>
                <br>
                <p><big>Votre commande <span class="font-weight-bold">n°${orderInformations.orderId}</span> de ${totalPrice}€ a bien été enregistré.</big></p>
                <p>Nous vous remercions de votre confiance.</p>
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