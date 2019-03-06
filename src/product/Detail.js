// product/Detail
import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Detail = (props) => {

	let prod = props.product

	if (prod.category) {
		return (
			<div>
				<p className="text-justify">{ prod.description }</p>
				<hr />
				<Row>
					<Col>
						<b>Department : </b>
						<p><small>{ prod.category.department.name }</small></p>
					</Col>
					<Col>
						<b>Category :</b>
						<p><small>{ prod.category.name }</small></p>
					</Col>
				</Row>
			</div>
		)
	} else {
		return null
	}
}

export default Detail