import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Loading extends React.Component {
	render() {
		return(
			<Container>
				<Row className="justify-content-md-center text-center mt-5">
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