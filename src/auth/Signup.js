import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
	render() {
		return(
			<Container>
				<Row>
					<Col md={7}>
						<h2 className="mt-5">Signup</h2>
						<Form>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control type="email" placeholder="Enter email" />
						    <Form.Text className="text-muted">
						      We'll never share your email with anyone else.
						    </Form.Text>
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control type="password" placeholder="Password" />
						  </Form.Group>

							<Form.Group controlId="formBasicConfirmPassword">
						    <Form.Label>Confirm Password</Form.Label>
						    <Form.Control type="password" placeholder="Confirm Password" />
						  </Form.Group>

						  <Form.Group controlId="formBasicChecbox">
						    <Form.Text className="text-muted">
						    	Already signin? login <Link to="/signin">here</Link>
								</Form.Text>
						  </Form.Group>
						  <Button variant="primary" type="submit">
						    Signup
						  </Button>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Signup