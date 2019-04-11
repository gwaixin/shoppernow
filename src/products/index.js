import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'
import ProductSearch from './ProductSearch'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import Paginator from '../component/Paginator'
import './products.css'

class Index extends React.Component {

	state = {
		products: null,
		limit: 12,
		keywords: '',
		page: 1,
		pages: 0,
		filterCategories: []
	}


	componentDidMount() {
		this.updatePage()
		this.timer = null;
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
				const products = res.data.result.rows
				const pages = Math.ceil(res.data.result.count / res.data.limit)
				// const page = res.data.result.page
				this.setState({ products, pages})
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
		clearTimeout(this.timer);

        const keywords = event.target.value
		const self = this
		self.timer = setTimeout(() => {
			self.setState({ keywords, page: 1 }, () => {
				self.updatePage()
			})
		}, 800);
		
	}

	onUpdateWithFilters(filterCategories) {
		this.setState({ filterCategories, page: 1 }, () => {
			this.updatePage()
		})
	}


	render() {
		return (
			<div>
				<Container>
        			<Row>
						<Col md={12} className="mb-3 mt-3">
							<h3><i className="fas fa-bullseye"></i> Trending Products Now</h3>
						</Col>

						{/* Product List */}
						<Col md={9}>

							<ProductList products={this.state.products} />
							
							<div>
								<Paginator 
									page={this.state.page} 
									pages={this.state.pages} 
									onChangePage={this.onChangePage.bind(this)} />
							</div>
						</Col>

						{/* Product search */}
						<Col md={3}>
							<Card className="sticky-top pb-5">
								<Card.Body>
									<div>
										<ProductSearch onSearch={this.onSearch.bind(this)} />
										<ProductFilter 
											onUpdate={ this.onUpdateWithFilters.bind(this) } 
											/>
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
        
      		</div>
		)
	}
}

export default Index