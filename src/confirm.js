let orderInformations = JSON.parse(sessionStorage.getItem("OrinocoOrderConfirmation"))

/******************* render confirmation message *******************/
// if there is an order confirmation in the session storage
// render a confirmation message
// if not, render an error message
function renderOrderConfirmation() {
	let mainContent = document.getElementById("main-content")

	if (orderInformations) {
		let confirmationMessage = `
            <div class="text-center mt-2">
                <img src="./assets/icons/checkmark.svg" alt="Commande approuvé" class="img-confirm" >
            </div>
            <div class="text-center">
                <p class="h1">Félicitation ${orderInformations.contact.firstName} !</p>
                <br>
                <p><big>Votre commande a bien été enregistré.</big></p>
                <p>Nous vous remercions de votre confiance.</p>
                <br>
                <p><big>Commande n° ${orderInformations.orderId}</span><br><br>d'un montant total de <span class="h5">${calculOrderPrice()} €</big></p>
            </div>
        `
		mainContent.setAttribute("class", "d-flex flex-column justify-content-center")
		mainContent.innerHTML = confirmationMessage
	} else {
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
		mainContent.setAttribute("class", "d-flex flex-column justify-content-center")
		mainContent.innerHTML = errorMessage
	}
}

/******************* calcul the total price of order *******************/
// check each item in the product ordered id list
// add each item's price to the final order price
function calculOrderPrice() {
	let orderPrice = 0
	for (let i in orderInformations.products) {
		orderPrice += orderInformations.products[i].price
	}
	return orderPrice / 100
}

// call the function when page loading
window.load = renderOrderConfirmation()
