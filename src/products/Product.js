import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import Price from '../component/Price'
import slugify from 'slugify'


const Product = (props) => {

	let prod = props.product
	let slug = slugify(prod.name, { remove: /[*+~.()'"!:@]/g, lower: true })
	let url = "/product/"+ prod.product_id + "/" + slug
	let discount = prod.discounted_price > 0 ? 
		<small className="text-muted">
			<s><Price value={ prod.discounted_price } /></s> -18%
		</small> : <br />


	return(
		<Link className="product-item" to={url}>
			<Card>
				<Card.Img variant="top" src={`/images/products/${prod.image}`} />
				<Card.Body className="p-2">
					<div className="price mb-1">
						<strong>
							<Price value={ prod.price } />
						</strong> <br/>
						{ discount }
					</div>
				
					<span className="product-name">{ prod.name }</span>
					<p className="text-muted">{ prod.description.substring(0, 50) + '...' }</p>
					<Row className="adon">
						<Col>Regional</Col>
						<Col className="text-right">French</Col>
					</Row>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product