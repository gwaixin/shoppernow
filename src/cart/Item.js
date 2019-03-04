// cart/Item
import React from 'react'
import { Row, Col, Button, Card, Image } from 'react-bootstrap'

class Item extends React.Component {
	render() {
		return(
			<div className="mt-1">
				<Card>
					<Card.Body>
						<Row>
							<Col md={2}>
								<Image src="//placehold.it/150x150" fluid />
							</Col>
							<Col md={6}>
								<h4>Lenovo 15.6" IdeaPad 330s Laptop</h4>
								<p className="text-muted">The 4TB Spare 4000 Enterprise Hard Drive from G-Technol...</p>
								<Button size="sm" variant="secondary">Read More</Button>
								<Button size="sm" variant="danger" className="ml-1" >Remove</Button>
							</Col>
							<Col md={4} className="text-right text-danger">
								$321.00
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</div>
		)
	}
}

export default Item