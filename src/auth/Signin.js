import React from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { ErrorHandler, Network } from '../helpers'
import AuthAlert from './AuthAlert'
import { addToken } from "../assets/js/actions/index"


const mapDispatchToProps = dispatch => {
	return { addToken: token => dispatch(addToken(token)) }
}

class SigninComponent extends React.Component {

	state = {
		errors: null,
		info: {
			show: false,
			title: '',
			message: ''
		},
		status: 'secondary'
	}

	componentDidMount() {
		console.log('weew :', this.props.location)
		if (this.props.location) {
			if (this.props.location.state === 'signedup') {
				// signed up
				this.setState({
					info: {
						show: true,
						title: 'Signup Success',
						message: 'Thank you for signing up! you can now sign in.'
					}
				})

			} else if (this.props.location.state === 'checkout') {
				// checkout
				this.setState({
					info: {
						show: true,
						title: 'Sign-In Required',
						message: 'You need to sign in your account to checkout'
					}
				})

				this.props.history.push({path: 'signin', state:''})
			}
		}
	}

	onSubmit(e) {
		e.preventDefault()

		// to avoid spam
		if (this.state.status === 'dark' || this.state.status === 'success') { return }

		const formData = {
			email: e.target['email'].value,
			password: e.target['password'].value
		}

		this.setState({ status: 'dark', errors: null }, () => {

			Network()
				.post('/api/auth/signin', formData)
				.then(res => {

					// success signin
					if (res.data.status) {
						// success
						const info = { show: false, title: '', message: '' }
						return this.setState({ status: 'success', errors: null, info }, () => {
							this.props.addToken(res.data.token)
							setTimeout(() => {
								this.props.history.push({pathname: '/', state: 'authenticated'})
							}, 3000)
						})
					}

					let errors = ErrorHandler(res)

					this.setState({ errors, status: 'danger' })

				})
				// error in request
				.catch(errs => {
					let errors = ErrorHandler(errs)
					this.setState({ errors, status: 'danger' })
				})

		})

	}


	render() {
		return(
			<Container>
				<Row>
					<Col md={7}>
						
						<AuthAlert errors={ this.state.errors } />
						
						<AuthAlert 
							info={ this.state.info.show } 
							title={this.state.info.title} 
							message={this.state.info.message} />

						<AuthAlert 
							success={ this.state.status } 
							title="Success Signin" 
							message="You will be redirect to user's dashboard in 3 seconds.. please wait" />
						
						<h2 className="mt-5">Signin</h2>
						
						<Form onSubmit={this.onSubmit.bind(this)}>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control name="email" type="email" placeholder="Enter email" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control name="password" type="password" placeholder="Password" />
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

const Signin = connect(null, mapDispatchToProps) (SigninComponent)

export default Signin