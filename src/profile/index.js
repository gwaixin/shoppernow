import React from 'react'
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button
} from 'react-bootstrap'
import General from './General'
import Contact from './Contact'
import Location from './Location'
import { Network } from '../helpers'
import { connect } from 'react-redux'
import {ToastsContainer, ToastsStore} from 'react-toasts'

const mapStateToProps = state => {
	return { token: state.token }
}


class Index extends React.Component {
	state = {
		profile: {}
	}

	

	componentDidMount() {
		Network({token: this.props.token})
			.post('/api/auth/check')
			.then(res => {
				const profile = res.data.user
				this.setState({ profile })
			})
	}

	onSubmit(e) {
		e.preventDefault()

		let formData = {
			name: e.currentTarget['name'].value,
			credit_card: e.currentTarget['credit_card'].value,
			address_1: e.currentTarget['address_1'].value,
			address_2: e.currentTarget['address_2'].value,
			city: e.currentTarget['city'].value,
			region: e.currentTarget['region'].value,
			postal_code: e.currentTarget['postal_code'].value,
			country: e.currentTarget['country'].value,
			day_phone: e.currentTarget['day_phone'].value,
			eve_phone: e.currentTarget['eve_phone'].value,
			mob_phone: e.currentTarget['mob_phone'].value,
			_id: this.state.profile._id
		}

		

		Network({token: this.props.token})
			.put('/api/users', formData)
			.then(res => {
				if (res.data.status) {
					ToastsStore.success("Congratulations, profile updated!")
				} else {
					ToastsStore.error("Failed to update profile! Please try again.")
				}
			})

		
	}

	render() {
		return (
			<Container>
				<ToastsContainer store={ToastsStore} lightBackground/>
				<Row>
					<Col md={12}>
						<Card border="dark" bg="light">
							<Card.Header>
								<h2 className="mt-2"><i className="fa fa-user"></i> Profile</h2>
							</Card.Header>
							<Card.Body>
								<small>Fill up every details here so that we will know more about you.</small>
								<Form onSubmit={ this.onSubmit.bind(this) } className="mt-3">
									<Row>
										<Col>
											<General 
												name={ this.state.profile.name } 
												credit={ this.state.profile.credit_card } />
										</Col>
										<Col>
											<Contact
												dayPhone={ this.state.profile.day_phone }
												evePhone={ this.state.profile.eve_phone }
												mobPhone={ this.state.profile.mob_phone } />
										</Col>
									</Row>
									<hr />
									<Location 
										profile={ this.state.profile }/>

									<Form.Group>
										<Button type="submit">Update Profile</Button>
									</Form.Group>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default connect(mapStateToProps) (Index)