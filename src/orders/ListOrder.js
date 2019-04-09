import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import Price from '../component/Price'
import Status from './Status'

const ListOrder = (props) => {
    return (
        <ListGroup>
            <ReactCSSTransitionGroup
                transitionName="fading"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {
                    props.orders.map(
                        (order, index) => {
                            const pretotal = parseFloat(order.total_amount) + parseFloat(order.Shipping.shipping_cost)
                            const taxCalc = (order.Tax.tax_percentage / 100) * pretotal
                            return (
                                <ListGroup.Item key={`lo-${index}`} disabled={ order.status === 4 }>
                                    <div class="float-right">Status: <Status code={ order.status } /></div>
                                    <h5>Order ID # {order.order_id} </h5>
                                    <Row>
                                        <Col>
                                            <div><small>Subtotal : <Price value={ order.total_amount } /></small></div>
                                            <div><small>Shipping Fee : <Price value={ order.Shipping.shipping_cost } /></small></div>
                                            <div><small>Tax : <Price value={ taxCalc } /></small></div>
                                            <div>TOTAL: <Price value={ pretotal } /></div>
                                        </Col>
                                        <Col className="text-right">
                                            <div>EST: { order.shipped_on }</div>
                                            <div>Checkout : { order.created_on }</div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            Items : {order.OrderDetails.map(item => item.product_name).join(', ')}
                                        </Col>
                                        { order.status === 0 ? (
                                            <Col className="text-right">
                                                <Button size="sm" variant="dark">Cancel</Button>
                                                <Button size="sm" variant="success" className="ml-1" onClick={() => props.onPayingOut(order) }>Pay</Button>
                                            </Col>
                                        ) : '' }
                                    </Row>
                                </ListGroup.Item>
                            )
                        }
                    )
                }
            </ReactCSSTransitionGroup>
        </ListGroup>
    )
}

export default ListOrder