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
                        (order, index) => 
                            <ListGroup.Item action key={`lo-${index}`}>
                                <h5># {order._id} </h5>
                                <Row>
                                    <Col>
                                        <div>Status: <Status code={ order.status } /></div>
                                        <div>Total : <Price value={order.total_amount} /></div>
                                    </Col>
                                    <Col className="text-right">
                                        <div>EST: { order.shipped_on }</div>
                                        <div>Checkout : { order.created_on }</div>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        {order.details.map(item => item.product_name).join(', ')}
                                    </Col>
                                    <Col className="text-right">
                                        <Button size="sm" variant="dark">Cancel</Button>
                                        <Button size="sm" variant="success" className="ml-1">Pay</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                    )
                }
            </ReactCSSTransitionGroup>
        </ListGroup>
    )
}

export default ListOrder