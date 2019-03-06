import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import Price from '../component/Price'


const Product = (props) => {

	let prod = props.product
	let url = "/product/"+ prod.product_id + "/" + prod.slug


	return(
		<Link className="product-item"  to={url}>
			<Card>
				<Card.Img variant="top" src={`/images/products/${prod.image}`} />
				<Card.Body className="p-2">
					<div className="price mb-1">
						<strong>
							<Price value={ prod.price } />
						</strong> <br/>
						<small className="text-muted"><Price value={ prod.discounted_price } isDiscount={true} /></small>
					</div>
				
					<span className="product-name">{ prod.name }</span>
					<p className="text-muted">{ prod.description.substring(0, 50) + '...' }</p>
					<Row className="adon">
						<Col>{ prod.category.department.name }</Col>
						<Col className="text-right">{ prod.category.name }</Col>
					</Row>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product