import React from 'react'
import { Button, Modal, Form, Col} from 'react-bootstrap'
import Price from '../component/Price'
import { Network, ErrorHandler } from '../helpers'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts'


class AddToCart extends React.Component {

	state = {
		showModal: false,
		colors: [],
		sizes: []
	}

	formRef = React.createRef()

	componentWillReceiveProps(newProps) {

		if (newProps.product.attributes) {
			const colors = newProps.product.attributes.filter(attr => attr.type === 'color')
			const sizes = newProps.product.attributes.filter(attr => attr.type === 'size')
			console.log('has attributes : ', colors, sizes)
			this.setState({ colors, sizes })
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
			product: this.props.product._id,
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

					<Modal.Body>
						<p>
							Are you sure you want to add this item to your cart? 
							<br />
							<small>Choose one attribute below</small>
						</p>
						<Form ref={this.formRef} onSubmit={this.onSubmitCart.bind(this)}>
							<Form.Row>
								<Form.Group as={Col} controlId="formColor">
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
												value={color._id}
											/>)
										) }
								</Form.Group>

								<Form.Group as={Col} controlId="formSize">
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
												value={size._id}
											/>)
										) }
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} md="6">
									<Form.Label><b>How Many?</b></Form.Label>
									<Form.Control type="number" name="quantity" placeholder="Enter the quantity" required />
									<Form.Text>
										Enter the quantity you want to have in your cart?
									</Form.Text>
								</Form.Group>
							</Form.Row>

							<Button variant="dark" onClick={this.handleClose.bind(this)}>Cancel</Button>
							<Button className="ml-1" variant="primary" type="submit">Confirm</Button>
						</Form>
					</Modal.Body>
				</Modal>

				<div className="text-center mb-3">
					<Button variant="primary" size="lg" onClick={this.handleOpen.bind(this)}>Add Cart <i className="fas fa-cart-plus"></i></Button>
					<hr className="mt-4"/>
					<h3 className="mt-3 text-success"><Price value={ this.props.product.price } /></h3>
					<p className="text-muted"><s><Price value={ this.props.product.discounted_price } hideZero={true} /></s></p>
				</div>

			</div>
		)
	}
}

export default AddToCart