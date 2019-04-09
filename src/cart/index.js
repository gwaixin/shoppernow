// cart/index
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Network, ErrorHandler } from '../helpers'
import { connect } from "react-redux"
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Price from '../component/Price'
import CustomModal from '../component/CustomModal'
import ListCart from './ListCart'
import CheckoutModal from './CheckoutModal'

const mapStateToProps = state => {
  return { token: state.token, cartId: state.cartId };
}


class Index extends React.Component {

	state = {
		cart: null,
		total: 0,

		// remove state properties
		showConfirm: false,
		removeId: '',

		// checkout state properties
		showCheckout: false
	}


	componentDidMount() {
		this.initCart()
	}

	calcTotal(cart) {
		var total = 0
		cart.forEach(item => {
			let newPrice = parseFloat(item.Product.discounted_price) === 0 ? item.Product.price : item.Product.discounted_price
			total += item.quantity * newPrice
		})

		return total
	}

	initCart() {
		Network({params: { cart_id: this.props.cartId }})
			.get('/api/cart')
			.then(res => {
				if (res.data.status) {
					const cart = res.data.cart

					// calculate price
					const total = this.calcTotal(cart)

					this.setState({ cart, total })
				} else {
					let errors = ErrorHandler(res)

					ToastsStore.error("Failed to fetch data : " + errors.join(', '))
				}
			})
	}


	// ---------------------- REMOVE FUNCTIONS ----------------
	onRemoveItem() {

		Network({token: this.props.token})
			.delete('/api/cart/' + this.state.removeId)
			.then(res => {
				// hides confirmation modal
				this.onHideConfirm()
				
				// check if remove was a success
				if (res.data.status) {
					// popup info
					ToastsStore.success("Item has been removed successfully from your cart.")

					// remove  item from the list
					const cart = this.state.cart.filter(item => item.item_id !== this.state.removeId)

					// re update total
					const total = this.calcTotal(cart)

					// update state
					this.setState({ removeId: '', cart, total })
				} else {

					let errors = ErrorHandler(res)

					ToastsStore.error("Item failed to remove " + errors.join(', '))
				}
			})
	}

	onShowConfirm(id) { this.setState({ showConfirm: true, removeId: id })}
	onHideConfirm() { this.setState({ showConfirm: false }) }


	// ---------------------- EDIT FUNCTIONS -----------------
	onAdd(id, quantity) { 
		Network()
		.put('/api/cart/', { item_id: id, quantity: quantity })
		.then(res => {
			console.log(res.data)
			if (res.data.status) {
				this.initCart()
				ToastsStore.success("Just added quantity")
			}
		})
	}
	onMinus(id, quantity) { 
		if (quantity === 0) { return } 

		Network()
		.put('/api/cart/', { item_id: id, quantity: quantity })
		.then(res => {
			console.log(res.data)
			if (res.data.status) {
				this.initCart()
				ToastsStore.success("Just deducted quantity")
			}
		})
	}


	// ----------------------------- CHECKOUT FUNCTIONS --------------------------
	onHideCheckout() { this.setState({ showCheckout: false }) }
	onShowCheckout() {
		// make sure to have auth before checking out
		if (!this.props.token) {
			ToastsStore.error("Signin to checkout!", 1500)
			setTimeout(() => {
				this.props.history.push({
					pathname: '/signin', state: 'checkout'
				})
			}, 1500)
		} else {
			this.setState({ showCheckout: true }) 
		}
	}
	onFinalCheckout(data) {
		data.inCartId = this.props.cartId

		Network({ token: this.props.token })
			.post('/api/orders', data)
			.then(res => {

				// check if checkout was a success
				if (res.data.status) {
					// popup info
					ToastsStore.success("Checkout success!! \n you can view your order status in /orders page")

					// hides popup checkout
					this.onHideCheckout()

					// update cart
					this.initCart()


				// otherwise handle error
				} else {
					let errors = ErrorHandler(res)
					ToastsStore.error("Failed to checkout! \n " + errors.join(', '))
				}
			})
			.catch(err => {
				let errors = ErrorHandler(err)
				ToastsStore.error("Failed to checkout! \n " + errors.join(', '))
			}) 
	}


	render() {

		const confirmFooter = (
			<div>
				<Button variant="dark" onClick={this.onHideConfirm.bind(this)}>Cancel</Button>
				<Button className="ml-1" variant="danger" onClick={this.onRemoveItem.bind(this)}>Confirm</Button>
			</div>
		)

		return(
			<Container>
				<Row>

					<ToastsContainer 
                            position={ToastsContainerPosition.TOP_CENTER}
                            store={ToastsStore} 
                            lightBackground />

					<CustomModal 
						isShow={this.state.showConfirm}
						onHide={this.onHideConfirm.bind(this)}
						size="md"
						title="Remove From Cart Confirmation"
						body="Are you sure you want to remove this item to your cart?"
						footer={confirmFooter} />

					<CheckoutModal
						isShow={this.state.showCheckout}
						onHide={this.onHideCheckout.bind(this)}
						cart={this.state.cart}
						onFinalCheckout={this.onFinalCheckout.bind(this)} />


					<Col md={12}>
						<h3 className="mb-3 mt-3">
							<i className="fa fa-shopping-cart"></i> My Carts
						</h3>
					</Col>

					<Col md={9}>
						<ListCart 
							cart={this.state.cart}
							onShowConfirm={this.onShowConfirm.bind(this)}
							onAdd={this.onAdd.bind(this)} 
							onMinus={this.onMinus.bind(this)} />
					</Col>

					<Col md={3}>
						{ 
							!this.state.cart || this.state.cart.length <= 0 ? null :
							<Card className="sticky-top pb-3">
								<Card.Body className="text-center">
										<h5 className="mb-3">TOTAL</h5>
										<h3><Price value={ this.state.total } /></h3>
										<Button variant="success" className="mt-3" onClick={this.onShowCheckout.bind(this)}>Checkout Now!</Button>
								</Card.Body>
							</Card>
						}
					</Col>
				</Row>
			</Container>
		)
	}
}

const Cart = connect(mapStateToProps) (Index)

export default Cart