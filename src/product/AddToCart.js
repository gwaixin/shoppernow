import React from 'react'
import { Button } from 'react-bootstrap'

class AddToCart extends React.Component {
	render() {
		return(
			<div className="text-right">
				<h3 className="text-danger">$299.95</h3>
				<p className="text-muted"><s>$1000.95</s></p>
				<Button variant="primary" size="lg">Add to Cart</Button>
			</div>
		)
	}
}

export default AddToCart