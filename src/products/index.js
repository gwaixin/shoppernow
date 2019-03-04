import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductSearch from './ProductSearch'
import ProductFilter from './ProductFilter'
import Product from './Product'
import './products.css'

class Index extends React.Component {
	render() {
		return (
			<div>
				<Container>
        	<Row>
						<Col md={12} className="mb-3 mt-3">
							<h3>Trending products now</h3>
						</Col>

						{/* Product List */}
						<Col md={9}>
							<Row className="products">
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>

								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>

								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
								<Col md={3} className="mb-3"><Product /></Col>
							</Row>
						</Col>

						{/* Product search */}
						<Col md={3}>
							<ProductSearch />
							<ProductFilter />
						</Col>
					</Row>
				</Container>
        
      </div>
		)
	}
}

export default Index