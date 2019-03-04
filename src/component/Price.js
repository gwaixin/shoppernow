import React from 'react'
import CurrencyFormat from 'react-currency-format'


const Price = (props) => {
    return (
        <CurrencyFormat value={ props.value }
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            prefix="$" />
    )
}

export default Price