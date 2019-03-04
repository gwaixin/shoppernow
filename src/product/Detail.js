// product/Detail
import React from 'react'
import { Row, Col } from 'react-bootstrap'

class Detail extends React.Component {
	render() {
		return(
			<div>
				<p className="text-justify">The 4TB Spare 4000 Enterprise Hard Drive from G-Technology is a hot-swappable Spare series drive for use with the G-Technology G-SPEED Studio, G-SPEED Studio XL, G-RAID Studio, and G-RAID arrays. As a Spare series drive, its frame is fitted with a mounting system that only allows it to be used with the mentioned G-Tech products.</p>
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
}

export default Detail