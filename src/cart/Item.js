// cart/Item
import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Card, Image } from 'react-bootstrap'
import Price from '../component/Price'

const Item = (props) => {

	if (!props.item) { return null }
	
	const product = props.item.product_id
	const color = props.item.attributes.filter(attr => attr.type === 'color')
	const size = props.item.attributes.filter(attr => attr.type === 'size')
	const url = "/product/"+ product.product_id + "/" + product.slug

	return(
		<div className="mb-3">
			<Card>
				<Card.Body>
					<Row>
						<Col md={2}>
							<Image src={`/images/products/${product.image}`} fluid />
						</Col>
						<Col md={6}>
							<h4>{ product.name }</h4>
							<p className="text-muted">{ product.description.substring(0, 100) + '...' }</p>
							<div>
								<small>
									<b>Size</b> :  { size[0].value }
									<b className="ml-3">Color</b> :  { color[0].value }
									<b className="ml-3">Qty</b> :  { props.item.quantity } pcs
								</small>
							</div>
						</Col>
						<Col md={4} className="text-right">
							<Price value={product.price} />
						</Col>
					</Row>
				</Card.Body>
				<Card.Footer>
					<Button as={Link} to={url} size="sm" variant="dark">View Details</Button>
					<Button size="sm" variant="dark" className="ml-1" onClick={() => props.onEdit(props.item)}>Edit</Button>
					<Button size="sm" variant="danger" className="ml-1" onClick={() => props.onRemove(props.item._id)}>Remove</Button>
					<div className="float-right ml-auto text-right text-danger">
						Subtotal : <Price value={ product.price * props.item.quantity  } />
					</div>
				</Card.Footer>
			</Card>
		</div>
	)

}

export default Item