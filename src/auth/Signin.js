import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Signin extends React.Component {
	render() {
		return(
			<Container>
				<Row>
					<Col md={7}>
						<h2 className="mt-5">Signin</h2>
						<Form>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control type="email" placeholder="Enter email" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control type="password" placeholder="Password" />
						  </Form.Group>
						  <Form.Group controlId="formBasicChecbox">
						    <Form.Text className="text-muted">
						    	No Account yet? signup <Link to="/signup">here</Link>
								</Form.Text>
								<Form.Text className="text-muted">
						    	Or lost your account? forget your <Link to="/signup">password</Link>
								</Form.Text>
						  </Form.Group>
						  <Button variant="primary" type="submit">
						    Submit
						  </Button>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Signin