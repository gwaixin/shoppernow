import React from 'react'
import CurrencyFormat from 'react-currency-format'


const Price = (props) => {

    let isDiscount = props.isDiscount ? 'text-strike' : ''
    let percentage = props.isDiscount ? '18%' : ''

    if (!props.hideZero || props.value > 0) {

        return (
            <span>
                <CurrencyFormat value={ props.value }
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    displayType="text"
                    prefix="$"
                    className={isDiscount} /> { percentage }
            </span>
        )
    } else {
        return null
    }
}

export default Price