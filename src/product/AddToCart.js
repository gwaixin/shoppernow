import React from 'react'
import { Button, Modal, Form, Col} from 'react-bootstrap'
import Price from '../component/Price'
import { Network, ErrorHandler } from '../helpers'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts'
import ProductPrice from './ProductPrice'

class AddToCart extends React.Component {

	state = {
		showModal: false,
		colors: [],
		sizes: [],
		cartId: ''
	}

	formRef = React.createRef()

	componentWillReceiveProps(newProps) {

		console.log('new props: ', newProps)

		if (newProps.product.ProductAttributes) {
			const colors = newProps.product.ProductAttributes.filter(attr => attr.AttributeValue.attribute_id === 2).map(attr => attr.AttributeValue)
    		const sizes = newProps.product.ProductAttributes.filter(attr => attr.AttributeValue.attribute_id === 1).map(attr => attr.AttributeValue)
			const cartId = newProps.cartId
			console.log('has attributes : ', colors, sizes, cartId)
			this.setState({ colors, sizes, cartId })
		}
	}

	handleOpen() {
		this.setState({ showModal: true })
	}

	handleClose() {
		this.setState({ showModal: false })
	}

	onSubmitCart(e) {
		e.preventDefault()
		let formData = {
			inProductId: this.props.product.product_id,
			// productQuantity: e.currentTarget['quantity'].value,
			inAttributes: JSON.stringify({ size: e.currentTarget['size'].value, color: e.currentTarget['color'].value }),
			inCartId: this.state.cartId
		}

		let errors = []
		// semi validation of size and color
		if (e.currentTarget['size'].value === '') {
			errors.push('Size must not be empty')
		}
		if (e.currentTarget['color'].value === '') {
			errors.push('Color must not be empty')
		}

		if (errors.length > 0) {
			ToastsStore.error("Failed to add cart! \n " + errors.join(', '))
			return
		}

		// now proceed to adding of cart
		Network({ token: this.props.token })
			.post('/api/cart', formData)
			.then(res => {
				if (res.data.status) {
					this.handleClose()
					ToastsStore.success("Added to cart! \n check this newly added item in your cart now.")
				} else {
					let errors = ErrorHandler(res)
					ToastsStore.error("Failed to add cart! \n " + errors.join(', '))
				}
			})
	}

	render() {

		return(

			<div>

				<ToastsContainer 
					position={ToastsContainerPosition.TOP_CENTER}
					store={ToastsStore} 
					lightBackground />

				<Modal 
					show={ this.state.showModal } 
					onHide={ this.handleClose.bind(this) }
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered >
					<Modal.Header closeButton>
						<Modal.Title>Add To Cart Confirmation</Modal.Title>
					</Modal.Header>

					<Modal.Body className="text-center">
						<p>
							Are you sure you want to add this item to your cart? 
							<br />
							<small>Choose one attribute below</small>
						</p>
						<Form ref={this.formRef} onSubmit={this.onSubmitCart.bind(this)}>
							
							<Form.Group controlId="formColor">
								<Form.Label><b>Color</b></Form.Label>
								<br/>
								{ 
									this.state.colors.map(color => 
										(<Form.Check 
											custom
											inline
											type="radio"
											id={`color-${color.value}`}
											key={`color-${color.value}`}
											label={color.value}
											name="color"
											value={color.value}
										/>)
									) }
							</Form.Group>

							<Form.Group controlId="formSize">
								<Form.Label><b>Size</b></Form.Label>
								<br />
								{ 
									this.state.sizes.map(size => 
										(<Form.Check 
											custom
											inline
											type="radio"
											id={`size-${size.value}`}
											key={`size-${size.value}`}
											label={size.value}
											name="size"
											value={size.value}
										/>)
									) }
							</Form.Group>

							<Button variant="dark" onClick={this.handleClose.bind(this)}>Cancel</Button>
							<Button className="ml-1" variant="primary" type="submit">Confirm</Button>
						</Form>
					</Modal.Body>
				</Modal>

				<div className="text-center mb-3">
					<Button variant="primary" size="lg" onClick={this.handleOpen.bind(this)}>Add Cart <i className="fas fa-cart-plus"></i></Button>
					<hr className="mt-4"/>
					<ProductPrice isDetail={true} price={this.props.product.price} discounted_price={this.props.product.discounted_price} />
				</div>

			</div>
		)
	}
}

export default AddToCart