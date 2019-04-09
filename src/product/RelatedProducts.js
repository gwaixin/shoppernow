import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-component'
import ProductPrice from './ProductPrice'

const RelatedProducts = (props) => {

	return(
		<div>
			<h3 className="mt-3 mb-3">Related Products : </h3>
			<Masonry className="relateds">
				{
					props.related.map((prod, index) => (
						<Link to={{ pathname: "/product/" + prod.product_id + "/" + prod.slug, state: 'newProduct' }} className="related-item" key={`test-${index}`}>
							<Card >
								<Card.Img src={`/images/products/${prod.image}`} />
								<Card.Body>
									<div className="price">
										<ProductPrice price={prod.price} discounted_price={prod.discounted_price} />
									</div>
									<span className="name">{prod.name}</span>
								</Card.Body>
							</Card>
						</Link>
					))
				}
			</Masonry>
		</div>
	)

}

export default RelatedProducts