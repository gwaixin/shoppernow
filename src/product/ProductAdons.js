// product/Detail
import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Detail = (props) => {


	if (props.product && props.product.ProductCategories) {
		let prod = props.product
		let others = prod.ProductCategories.map(({ Category }) => { return { category: Category.name, department: Category.Department.name } })
		let categories = others.map(_ => _.category).join(', ')
		let departments = others.map(_ => _.department).join(', ')

	
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
						<div><small>{ departments }</small></div>
					</Col>
					<Col className="text-right">
						<b>Category</b>
						<div><small>{ categories }</small></div>
					</Col>
				</Row>
			</div>
		)
	} else {
		return null
	}
}

export default Detail