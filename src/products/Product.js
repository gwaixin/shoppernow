import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import Price from '../component/Price'


const Product = (props) => {

	let prod = props.product
	let url = "/product/"+ prod.product_id + "/" + prod.slug

	let specialitem = 'product-item'

	return(
		<Link className={specialitem}  to={url}>
			<Card>
				<Card.Img variant="top" src={`/images/products/${prod.image}`} />
				<Card.Body className="p-2">
					<div className="price mb-1">
						<div>
							<strong>
								<Price value={ prod.price } />
							</strong> 
						</div>
						<small className="text-muted"><Price value={ prod.discounted_price } isDiscount={true} /></small>
					</div>
				
					<span className="product-name">{ prod.name }</span>
					<div className="product-info">
						<p className="text-muted">{ prod.description.substring(0, 50) + '...' }</p>
						<Row className="adon">
							<Col> { prod.category.department.name }</Col>
							<Col className="text-right">{ prod.category.name }</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product