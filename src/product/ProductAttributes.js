import React from 'react'

const ProductAttributes = (props) => {

    if (!props.attributes) {
        return null
    }

    let colors = props.attributes.filter(attr => attr.type === 'color')
    let sizes = props.attributes.filter(attr => attr.type === 'size')

    return (
        <div className="attributes">
            <div><b>Sizes : </b> { sizes.map(attr => attr.value).join(', ') }</div>
            <div className="mt-3">
                <ul className="colorbox">
                    { 
                        colors.map(attr => (
                            <li className="colorbox-item" style={{backgroundColor: attr.value }}/>
                        )) 
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductAttributes