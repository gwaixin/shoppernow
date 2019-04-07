import React from 'react'
import CurrencyFormat from 'react-currency-format'


const Price = (props) => {

    let isDiscount = props.isDiscount ? 'text-strike' : ''

    if (!props.hideZero || props.value > 0) {
        let percentage = props.discount ? (100 - (props.discount / props.value) * 100).toFixed(2) + '%' : ''

        return (
            <span>
                <CurrencyFormat value={ props.value }
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                    className={isDiscount} /> <small className="text-success">{ percentage }</small>
            </span>
        )
    } else {
        return null
    }
}

export default Price