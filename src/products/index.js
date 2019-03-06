import React from 'react'
import axios from 'axios'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Container, Row, Col } from 'react-bootstrap'
import ProductSearch from './ProductSearch'
import ProductFilter from './ProductFilter'
import Product from './Product'
import Paginator from '../component/Paginator'
import './products.css'

class Index extends React.Component {

	state = {
		products: [],
		limit: 12,
		keywords: '',
		page: 1,
		pages: 0,
		filterCategories: []
	}


	componentDidMount() {
		this.updatePage()
	}

	updatePage() {
		axios.get('http://localhost:3006/api/products', {
			params: {
				limit: this.state.limit,
				page: this.state.page,
				keywords: this.state.keywords,
				categories: this.state.filterCategories
			}
		})
		.then(res => {
			if (res.data.status) {
				const products = res.data.result.docs
				const pages = res.data.result.pages
				const page = res.data.result.page
				this.setState({ products, pages, page})
				// window.scrollTo(0, 0)
			}
		})
	}

	onChangePage(page) {
		this.setState({ page: page }, () => {
			this.updatePage()
		})
		
	}

	onSearch(event) {
		event.preventDefault()
		const keywords = event.target['search'].value
		this.setState({ keywords, page: 1 }, () => {
			this.updatePage()
		})
		
	}

	onUpdateWithFilters(filterCategories) {
		this.setState({ filterCategories }, () => {
			this.updatePage()
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
							<ReactCSSTransitionGroup 
								transitionName="fading"
								transitionLeaveTimeout={300}
								transitionEnterTimeout={300}
								className="products">
								
								{
									this.state.products.length > 0 ? 
										(
											this.state.products.map((prod, i) => {
												return(
													<div className="product-item" 
														key={`product-${prod.product_id}`}
														style={{"transitionDelay": `${ i * .06 }s` }}>
														
														<Product product={prod} />
														
													</div>
												)
											})
										)
									: <h5 className="text-danger mt-5 full-width">No product found.</h5>
								}
							</ReactCSSTransitionGroup>
							
							<div>
								<Paginator 
									page={this.state.page} 
									pages={this.state.pages} 
									onChangePage={this.onChangePage.bind(this)} />
							</div>
						</Col>

						{/* Product search */}
						<Col md={3}>
							<div className="sticky-top">
								<ProductSearch onSearch={this.onSearch.bind(this)} />
								<ProductFilter 
									onUpdate={ this.onUpdateWithFilters.bind(this) } 
									/>
							</div>
						</Col>
					</Row>
				</Container>
        
      		</div>
		)
	}
}

export default Index