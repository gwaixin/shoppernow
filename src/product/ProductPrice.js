import React from 'react'
import Price from '../component/Price'

const ProductPrice = (props) => {

	let priceClass = props.isDetail ? 'mt-3 text-success h3' : 'mt-3'


	if (props.discounted_price > 0) {

		return (
			<div>
				<div className={priceClass}>
					<strong>
						<Price value={ props.discounted_price } />
					</strong> 
				</div>
				<p className="text-muted">
					<Price 
						value={ props.price } 
						discount={ props.discounted_price }
						isDiscount={true}
						hideZero={true} />
				</p>
			</div>
		)


	} else {
		return (
			<div className={priceClass}>
				<strong>
					<Price value={ props.price } />
				</strong>
			</div>
		)
	}

}

export default ProductPrice