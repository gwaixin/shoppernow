import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import ProductAdons from './ProductAdons'
import AddToCart from './AddToCart'
import RelatedProducts from './RelatedProducts'
import ProductReviews from './ProductReviews'
import ProductAttributes from './ProductAttributes'
import NotFound from '../component/NotFound'
import './product.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return { 
		token: state.token,
		cartId: state.cartId
	}
}

class Index extends React.Component {

	state = {
		product: {},
		related: []
	}

	componentDidMount() {
		const id = this.props.match.params.id
		const slug = this.props.match.params.slug
		this.onFetchProduct(id, slug)

		console.log('cart id here : ', this.props.cartId)
	}

	// update when received a new product
	componentWillReceiveProps(nextProps) {

		if (nextProps.location.state === 'newProduct') {

			const id = nextProps.match.params.id
			const slug = nextProps.match.params.slug

			// must clear product
			this.setState({ product: {}}, () => {
				window.scrollTo(0, 0)
				// before fetch and update
				setTimeout(() => {
					
					this.onFetchProduct(id, slug)
				}, 300)
			})
			
		}
	}

	// fetch specific product with @id and @slug
	onFetchProduct(id, slug) {

		axios.get('http://localhost:3006/api/products/'+id+'/'+slug)
			.then(res => {
				if (res.data.status) {
					const product = res.data.product
					const related = res.data.related

					console.log('product : ', res.data.product)
					this.setState({ product, related })
				} else {
					this.setState({ product: null })
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
						<Col md={9} className="mb-3">
							<Card>
								<Card.Body className="product-detail">
									<h1 className="mb-3">{ this.state.product.name }</h1>
									<ReactCSSTransitionGroup
										transitionName="fading"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
										{
											this.state.product.image ? 
											<Row>
												<Col md={3}>
													<Image thumbnail src={`/images/products/${this.state.product.image}`} alt="" fluid />
												</Col>
												<Col md={7}>
													<p className="text-justify">{ this.state.product.description }</p>
													<ProductAttributes attributes={ this.state.product.ProductAttributes } />
												</Col>
												<Col md={2}>
													<Image src={`/images/products/${this.state.product.image_2}`} alt="" fluid />
												
												</Col>
											</Row>
											: null
										}
									</ReactCSSTransitionGroup>
								</Card.Body>
								<Card.Footer>
									<ProductAdons product={ this.state.product } />
								</Card.Footer>
							</Card>
						</Col>
						<Col md={3}>
							<Card>
								<Card.Body>
									<AddToCart 
										token={ this.props.token }
										product={ this.state.product }
										cartId={ this.props.cartId } />
								</Card.Body>
							</Card>
						</Col>
					</Row>
					
					{/* Product Reviews */}
					<Row className="mt-5">
						<Col md={12}>
							<ProductReviews product={ this.state.product }/>
						</Col>
					</Row>

	
					{/* Related Products */}
					<Row className="mt-5">
						<Col md={12}>
							<RelatedProducts related={ this.state.related }/>
						</Col>
					</Row>
				</Container>
			)
		}
	}
}

export default connect(mapStateToProps) (Index)