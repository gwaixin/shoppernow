import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Signout extends React.Component {
	render() {
		return(
			<Container>
				<Row>
					<Col className="text-center">
						<h2 className="text-muted">Thank you for shopping with us,<br /> please come back again..</h2>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Signout