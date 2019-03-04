import React from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import ProductSearch from './ProductSearch'
import ProductFilter from './ProductFilter'
import Product from './Product'
import './products.css'

class Index extends React.Component {

	state = {
		products: []
	}


	componentDidMount() {
		axios.get('http://localhost:3006/api/products')
			.then(res => {
				const products = res.data.products
				this.setState({ products })
				console.log('products daw : ', products)
			})
	}


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

								{
									this.state.products.map(prod => {
										return(
											<Col key={`product-${prod.product_id}`} md={3} className="mb-3">
												<Product product={prod} />
											</Col>
										)
									})
								}
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