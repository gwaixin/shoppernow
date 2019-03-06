// product/Detail
import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Detail = (props) => {

	let prod = props.product

	return (
		<div>
			<p className="text-justify">{ prod.description }</p>
			<hr />
			<Row>
				<Col>
					<b>Department : </b>
					<p><small>Regional</small></p>
				</Col>
				<Col>
					<b>Category :</b>
					<p><small>Italian</small></p>
				</Col>
			</Row>
		</div>
	)
}

export default Detail