import React from 'react'
import { Button } from 'react-bootstrap'
import Price from '../component/Price'

const AddToCart = (props) => {
	
	let prod = props.product


	return(
		<div className="text-center mb-3">
			<Button variant="primary" size="lg">Add Cart <i className="fas fa-cart-plus"></i></Button>
			<hr className="mt-4"/>
			<h3 className="mt-3 text-success"><Price value={ prod.price } /></h3>
			<p className="text-muted"><s><Price value={ prod.discounted_price } /></s></p>
		</div>
	)
}

export default AddToCart