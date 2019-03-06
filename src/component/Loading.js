import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Loading extends React.Component {

	state = {
		align: 'justify-content-md-center text-center'
	}

	componentDidMount() {
		if (this.props.align) {
			this.setState({ align: this.props.align })
		}
	}

	render() {
		return(
			<Container>
				<Row className={`mt-5 ${this.state.align}`}>
					<Col md={5}>
						<div className="double">
							<span className="ouro">
						    <span className="left"><span className="anim"></span></span>
						    <span className="right"><span className="anim"></span></span>
						  </span>
						</div>
						<small>Please wait...</small>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Loading