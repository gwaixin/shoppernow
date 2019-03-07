// product/Detail
import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Detail = (props) => {

	let prod = props.product

	if (prod.category) {
		return (
			<div>
				<Row>
					<Col md={6}>
						<i className="fa fa-star"></i>
						<i className="fa fa-star"></i>
						<i className="fa fa-star"></i>
						<i className="fa fa-star"></i>
						<i className="fa fa-star"></i>
					</Col>
					<Col className="text-right">
						<b>Department</b>
						<div><small>{ prod.category.department.name }</small></div>
					</Col>
					<Col className="text-right">
						<b>Category</b>
						<div><small>{ prod.category.name }</small></div>
					</Col>
				</Row>
			</div>
		)
	} else {
		return null
	}
}

export default Detail