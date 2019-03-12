// cart/index
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Network, ErrorHandler } from '../helpers'
import { connect } from "react-redux"
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Price from '../component/Price'
import CustomModal from '../component/CustomModal'
import ListCart from './ListCart'
import ItemEditModal from './ItemEditModal'

const mapStateToProps = state => {
  return { token: state.token };
}


class Index extends React.Component {

	state = {
		cart: [],
		total: 0,

		// remove state properties
		showConfirm: false,
		removeId: '',

		// edit state properties
		editItem: null,
		editShow: false
	}


	componentDidMount() {
		Network({token: this.props.token})
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

	calcTotal(cart) {
		var total = 0
		cart.forEach(item => {
			total += item.quantity * item.product_id.price
		})

		return total
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
					const cart = this.state.cart.filter(item => item._id !== this.state.removeId)

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
	onEditShow(item) { this.setState({ editShow: true, editItem: item }) }
	onEditHide() { this.setState({ editShow: false }) }
	onEditSubmit(e) {
		e.preventDefault()

		let formData = {
			id: this.state.editItem._id,
			product: this.state.editItem.product_id._id,
			quantity: e.currentTarget['quantity'].value,
			size: e.currentTarget['size'].value,
			color: e.currentTarget['color'].value,
		}

		let errors = []
		// semi validation of size and color
		if (formData.size === '') {
			errors.push('Size must not be empty')
		}
		if (formData.color === '') {
			errors.push('Color must not be empty')
		}

		if (errors.length > 0) {
			ToastsStore.error("Failed to add cart! \n " + errors.join(', '))
			return
		}


		Network({token: this.props.token})
			.put('/api/cart', formData)
			.then(res => {
				// hides confirmation modal
				this.onEditHide()
				
				// check if update was a success
				if (res.data.status) {
					// popup info
					ToastsStore.success("Item has been updated successfully.")

					// re update cart item
					let cart = Object.assign([], this.state.cart)
					const index = cart.findIndex(item => item._id === formData.id)
					cart[index] = res.data.item

					// re update total
					const total = this.calcTotal(cart)

					this.setState({ cart, total, editItem: null })
				} else {

					let errors = ErrorHandler(res)

					ToastsStore.error("Item failed to remove " + errors.join(', '))
				}
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

					<ItemEditModal
						isShow={this.state.editShow}
						onHide={this.onEditHide.bind(this)}
						onEditSubmit={this.onEditSubmit.bind(this)}
						item={this.state.editItem} />


					<Col md={12}>
						<h3 className="mb-3 mt-3">Shopping Carts</h3>
					</Col>

					<Col md={9}>
						<ListCart 
							cart={this.state.cart}
							onEditShow={this.onEditShow.bind(this)}
							onShowConfirm={this.onShowConfirm.bind(this)}/>
					</Col>

					<Col md={3}>
						<Card className="sticky-top pb-3">
							<Card.Body className="text-center">
									<h5 className="mb-3">TOTAL</h5>
									<h3><Price value={ this.state.total } /></h3>
									<Button variant="success" className="mt-3">Checkout Now!</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

const Cart = connect(mapStateToProps) (Index)

export default Cart