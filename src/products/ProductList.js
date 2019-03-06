import React from 'react'
import Loading from '../component/Loading'
import Masonry from 'react-masonry-component'
import Product from './Product'


const ProductList = (props) => {

    if (props.products) {
        return(
            
                props.products.length > 0 ? 
                    (
                        <Masonry className={"products"}>
                        {props.products.map((prod, i) => {
                            return(
                                <div 
                                    key={`product-${prod.product_id}`}
                                    style={{"transitionDelay": `${ i * .06 }s` }}>
                                    
                                    <Product product={prod} />
                                    
                                </div>
                            )
                        })}
                        </Masonry>
                    )
                : <h5 className="text-danger mt-5 full-width">No product found.</h5>
            
        )
    } else {
        return <Loading />
    }
}

export default ProductList