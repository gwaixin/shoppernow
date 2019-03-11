// cart/index
import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import Item from './Item'
import { Network } from '../helpers'
import { connect } from "react-redux"

const mapStateToProps = state => {
  return { token: state.token };
}


class Index extends React.Component {


	componentDidMount() {
		Network({token: this.props.token})
			.get('/api/cart')
			.then(res => {
				console.log('result is: ', res)
			})
	}

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

const Cart = connect(mapStateToProps) (Index)

export default Cart