import React from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import Detail from './Detail'
import AddToCart from './AddToCart'
import RelatedProducts from './RelatedProducts'
import NotFound from '../component/NotFound'

class Index extends React.Component {

	state = {
		product: {}
	}

	componentDidMount() {
		let id = this.props.match.params.id
		let slug = this.props.match.params.slug

		axios.get('http://localhost:3006/api/products/'+id+'/'+slug)
			.then(res => {
				if (res.data.status) {
					const product = res.data.product
					this.setState({ product })
					console.log('product daw : ', product)
				}
			})
	}

	render() {
		if (this.state.product == null) {
			return (<NotFound message="Product Not Found" />)
		} else {
			return(
				<Container>
	
					{/* Product Detail */}
					<Row>
						<Col md={12}>
							<h1 className="mt-3 mb-3">{ this.state.product.name }</h1>
						</Col>
						<Col md={3}>
							<img src={`/images/products/${this.state.product.image}`} alt="" className="img-fluid" />
						</Col>
						<Col md={6}>
							<Detail product={ this.state.product } />
						</Col>
						<Col md={3}>
							<AddToCart product={ this.state.product } />
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
}

export default Index