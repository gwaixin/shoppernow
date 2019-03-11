import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

// name
// credit_card
// address_1
// address_2
// city
// region
// postal_code
// country
// shipping_region_id
// day_phone
// eve_phone
// mob_phone
class Index extends React.Component {
	state = {
		profile: {},
	}


	render() {
		return (
			<Container>
				<Row>
					<Col md={12}>
						<Card border="dark" bg="light">
							<Card.Header>
								<h2 className="mt-2"><i className="fa fa-user"></i> Profile</h2>
							</Card.Header>
							<Card.Body>
								<small>Fill up every details here so that we will know more about you.</small>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Index