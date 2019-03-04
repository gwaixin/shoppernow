// cart/index
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Item from './Item'


class Index extends React.Component {
	render() {
		return(
			<Container>
				<Row>
					<Col md={12}>
						<h3 className="mb-3 mt-3">Shopping Carts</h3>
					</Col>
					<Col md={9}>
						<div>
							<Item />
							<Item />
							<Item />
							<Item />
						</div>
					</Col>
					<Col md={3}>
						<Card>
							<Card.Body className="text-center">
									<h5 className="mb-3">Subtotal</h5>
									<h3>$1,500.00</h3>
									<Button variant="success" className="mt-3">Checkout Now!</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Index