import React from 'react'

const ProductAttributes = (props) => {

    if (!props.attributes) {
        return null
    }

    let colors = props.attributes.filter(attr => attr.AttributeValue.attribute_id === 2).map(attr => attr.AttributeValue.value)
    let sizes = props.attributes.filter(attr => attr.AttributeValue.attribute_id === 1).map(attr => attr.AttributeValue.value)

    return (
        <div className="attributes">
            <div><b>Sizes : </b> { sizes.map(attr => attr).join(', ') }</div>
            <div className="mt-3">
                <ul className="colorbox">
                    { 
                        colors.map((attr, index) => (
                            <li key={`colors-${index}`} className="colorbox-item" style={{backgroundColor: attr }}/>
                        )) 
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductAttributes