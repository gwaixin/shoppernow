const Checkout = (options, callback, closed) => {
	if (typeof window.StripeCheckout === 'undefined') {
		console.log('Fail to checkout with stripe reason : undefined')
		return
	}

	const handler = window.StripeCheckout.configure({
		key: "pk_test_A5ZorUy4vfuHCDtUVWJwMIUy",
		image: "https://stripe.com/img/documentation/checkout/marketplace.png",
		locale: "auto",
		token: function(token) {
			// You can access the token ID with `token.id`.
			// Get the token ID to your server-side code for use.
			console.log("receive", token)

			if (typeof callback !== 'undefined') {
				callback(token)
			}
		},
		closed: closed
	})


	// show checkout with stripe
	handler.open(options)
}

export {
	Checkout
}