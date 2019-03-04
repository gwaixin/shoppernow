import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Detail from './Detail'
import AddToCart from './AddToCart'
import RelatedProducts from './RelatedProducts'

class Index extends React.Component {
	render() {
		return(
			<Container>

				{/* Product Detail */}
				<Row>
					<Col md={12}>
						<h1 className="mt-3 mb-3">G-Technology 4TB Spare 4000 Enterprise Hard Drive</h1>
					</Col>
					<Col md={3}>
						<img src="//picsum.photos/600/350/?random" alt="" className="img-fluid" />
					</Col>
					<Col md={6}>
						<Detail />
					</Col>
					<Col md={3}>
						<AddToCart />
					</Col>
				</Row>

				{/* Related Products */}
				<Row className="mt-5">
					<Col md={12}>
						<RelatedProducts />
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Index