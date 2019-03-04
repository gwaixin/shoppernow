import React from 'react'
import { Card, CardColumns } from 'react-bootstrap'

class RelatedProducts extends React.Component {
	render() {
		return(
			<div>
				<h3 className="mt-3 mb-3">Related Products : </h3>
				<CardColumns break={5}>
					{[1, 2, 3, 4, 5, 6].map(number => (
						<Card key={`test-${number}`}>
							<Card.Img src={`//picsum.photos/350/250/?image=${number}`} />
							<Card.Body>
								<small>Samsung MOBILE PHONE B105</small>
							</Card.Body>
						</Card>
					))}
				</CardColumns>
			</div>
		)
	}
}

export default RelatedProducts