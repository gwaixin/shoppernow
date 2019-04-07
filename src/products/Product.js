import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import ProductPrice from './ProductPrice'


const Product = (props) => {

	let prod = props.product
	let url = "/product/"+ prod.product_id + "/" + prod.slug

	let specialitem = 'product-item'
	let others = prod.ProductCategories.map(({ Category }) => { return { category: Category.name, department: Category.Department.name } })
	let categories = others.map(_ => _.category).join(', ')
	let departments = others.map(_ => _.department).join(', ')

	return(
		<Link className={specialitem}  to={url}>
			<Card>
				<Card.Img variant="top" src={`/images/products/${prod.image}`} />
				<Card.Body className="p-2">
					<div className="price mb-1">
						<ProductPrice price={prod.price} discounted_price={prod.discounted_price} />
					</div>
				
					<span className="product-name">{ prod.name }</span>
					<div className="product-info">
						<p className="text-muted">{ prod.description.substring(0, 50) + '...' }</p>
						<Row className="adon">
							<Col> { departments }</Col>
							<Col className="text-right">{ categories }</Col>
						</Row>
					</div>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default Product