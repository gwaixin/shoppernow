import React from 'react'
import { Container, Row, Col, Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ErrorHandler } from '../helpers'

class Signup extends React.Component {

	state = {
		errors: null,
		status: 'secondary',
	}

	onSubmit(e) {
		e.preventDefault()

		// to avoid spam
		if (this.state.status === 'dark' || this.state.status === 'success') { return }

		const formData = {
			email: e.target['email'].value,
			name: e.target['name'].value,
			password: e.target['password'].value,
			password_confirm: e.target['password_confirm'].value,
		}

		this.setState({ status: 'dark', errors: null }, () => {

			axios
				.post('http://localhost:3006/api/users', formData)
				.then(res => {
					
					let errors = []

					// success sign up
					if (res.data.status) {
						// succes
						this.props.history.push({pathname: '/signin', state: 'signedup'})

	
					// otherwiser handle error below
					} else {
						errors = ErrorHandler(res)
					}

					this.setState({errors, status: 'danger'})
				})
				.catch(errs => {
					let errMessage = 'Request Error ' 
						+ errs.response.status 
						+ ' : ' 
						+ errs.response.statusText
	
					this.setState({errors: [errMessage], status: 'danger'})
				})

		})
	}



	render() {

		return(
			<Container>
				<Row className="mt-5">
					<Col md={7}>
						{ this.state.errors && this.state.errors.length > 0 ? 
							(
								<Alert variant="danger">
									<Alert.Heading><i className="fas fa-exclamation-triangle"></i> Signup Failed!!</Alert.Heading>
									<ul>
									{ this.state.errors.map((e, index) => <li key={`error-${index}`}>{e}</li>) }
									</ul>
								</Alert>
							)
							: '' 
						}

						{ this.state.status === 'success' ?
								<Alert variant="success">
									<Alert.Heading>
										<i className="fas fa-check-circle"></i> Signup Success!!
									</Alert.Heading>
									<p>Page will redirect to user's dashboard in 3 seconds..</p>
								</Alert>
							: ''
						}
						<div className="mt-5">
							
							<h2 className="mb-3 mt-3">
								Signup Now
							</h2>
							
							<Form onSubmit={this.onSubmit.bind(this)}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control name="email" type="email" placeholder="Enter email" required />
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>

								<Form.Group controlId="formBasicName">
									<Form.Label>Name</Form.Label>
									<Form.Control name="name" type="text" placeholder="Your name" required />
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control name="password" type="password" placeholder="Password" required />
								</Form.Group>

								<Form.Group controlId="formBasicConfirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control name="password_confirm" type="password" placeholder="Confirm Password" required />
								</Form.Group>
								<Form.Group controlId="formBasicChecbox" className="mt-5">
									<Form.Text className="text-muted">
										Already signin? login <Link to="/signin">here</Link>
									</Form.Text>
									<Button className="mt-3" variant="primary" type="submit">
										<i className="fas fa-user-plus"></i>  Signup 
									</Button>
								</Form.Group>
							</Form>
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Signup