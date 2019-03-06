import React from 'react'
import { Button } from 'react-bootstrap'
import Price from '../component/Price'

const AddToCart = (props) => {
	
	let prod = props.product


	return(
		<div className="text-right">
			<h3 className="text-danger"><Price value={ prod.price } /></h3>
			<p className="text-muted"><s><Price value={ prod.discounted_price } /></s></p>
			<Button variant="primary" size="lg">Add to Cart</Button>
		</div>
	)
}

export default AddToCart