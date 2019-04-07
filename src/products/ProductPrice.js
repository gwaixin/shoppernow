import React from 'react'
import Price from '../component/Price'

const ProductPrice = (props) => {

	if (props.discounted_price > 0) {
		return (
			<div>
				<div>
					<strong>
						<Price value={ props.discounted_price } />
					</strong> 
				</div>
				<small className="text-muted">
					<Price 
						value={ props.price } 
						discount={ props.discounted_price }
						isDiscount={true}
						hideZero={true} />
				</small>
			</div>
		)
	} else {
		return <div><strong><Price value={ props.price } /></strong> </div>
	}

}

export default ProductPrice