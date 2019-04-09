import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { removeToken } from '../assets/js/actions/index'
import { connect } from "react-redux"

const mapDispatchToProps = dispatch => {
	return { removeToken: () => dispatch(removeToken()) }
}

class Signout extends React.Component {
	componentDidMount() {
		// redirect after 5 seconds
		this.props.removeToken()
		setTimeout(() => {
			this.props.history.push('/')
		}, 3000)
	}

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

export default connect(null, mapDispatchToProps) (Signout)