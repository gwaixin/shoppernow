// cart/Item
import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Card, Image } from 'react-bootstrap'
import Price from '../component/Price'
import ProductPrice from '../product/ProductPrice'

const Item = (props) => {

	if (!props.item) { return null }
	
	const product = props.item.Product
	const prodAttribute = JSON.parse(props.item.attribute)
	const url = "/product/"+ product.product_id + "/" + product.slug
	const newprice = parseFloat(product.discounted_price) === 0 ? product.price : product.discounted_price
	const subtotal = newprice * props.item.quantity

	return(
		<div className="mb-3">
			<Card>
				<Card.Body>
					<Row>
						<Col md={2}>
							<Image src={`/images/products/${product.image}`} fluid />
						</Col>
						<Col md={10}>
							<span className="float-right"><ProductPrice price={product.price} discounted_price={product.discounted_price}  /></span>
							<h4>{ product.name }</h4>
							<p className="text-muted">{ product.description.substring(0, 100) + '...' }</p>
							<div>
								<small>
									<b>Color</b> : { prodAttribute.color }
									<b className="ml-3">Size</b> : { prodAttribute.size }
									<b className="ml-3">Qty</b> :  { props.item.quantity } pcs
								</small>
								<div className="float-right text-right">
									<Button size="sm" variant="dark" onClick={() => props.onMinus(props.item.item_id, props.item.quantity - 1)}><i className="fa fa-minus"></i></Button>
									<Button className="ml-1" size="sm" variant="dark" onClick={() => props.onAdd(props.item.item_id, props.item.quantity + 1)}><i className="fa fa-plus"></i></Button>
								</div>
							</div>
						</Col>
					</Row>
				</Card.Body>
				<Card.Footer>
					<Button as={Link} to={url} size="sm" variant="dark">View Details</Button>
					<Button size="sm" variant="danger" className="ml-1" onClick={() => props.onRemove(props.item.item_id)}>Remove</Button>
					<div className="float-right ml-auto text-right text-danger font-weight-bold">
						Subtotal : <Price value={ subtotal } />
					</div>
				</Card.Footer>
			</Card>
		</div>
	)

}

export default Item