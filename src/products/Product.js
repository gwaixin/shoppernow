import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'


class Product extends React.Component {
	render() {
		return(
			<Card className="product-item">
				<Card.Img variant="top" src="//placehold.it/671x480" />
				<div className="p-1">
					<div class="price mb-1">
						<strong>₱15,500.00</strong> <br/>
						<small class="text-muted"><s>₱19,000.00</s> -18%</small>
					</div>
				
					<Link to="/product/12312/quality-affordable-assus-computer-set">QUALITY AND AFFORDABLE ASUS COMPUTER SET 19" wide A4 6300</Link>
					<Row className="adon">
						<Col>Regional</Col>
						<Col className="text-right">French</Col>
					</Row>
				</div>

			</Card>
		)
	}
}

export default Product