import React from 'react'
import { Badge } from 'react-bootstrap'

// 0: unpaid, 1: paid, 2: shipping, 3: shipped, 4: done

const Status = (props) => {

    switch (props.code) {
        case 0: return <Badge variant="secondary">Unpaid</Badge>
        case 1: return <Badge variant="primary">Paid</Badge>
        case 2: return <Badge variant="warning">Shipping</Badge>
        case 3: return <Badge variant="info">Shipped</Badge>
        case 4: return <Badge variant="success">Done</Badge>
        default:  return null
    }

}

export default Status