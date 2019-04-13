import React from 'react'
import { Network, ErrorHandler, AddScripts } from '../helpers'
import { Checkout } from '../helpers/stripe'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { removeToken } from '../assets/js/actions/index'
import ListOrder from './ListOrder'


const mapStateToProps = state => {
    return { token: state.token }
}

const mapDispatchToProps = dispatch => {
    return { removeToken: () => dispatch(removeToken()) }
}

class OrderIndex extends React.Component {

    state = {
        orders: [],
        customer: null
    }

    componentDidMount() {

        // prepare stripe script here
        AddScripts('https://js.stripe.com/v3/')
        AddScripts('https://checkout.stripe.com/checkout.js')


        Network({ token: this.props.token })
            .get('/api/orders')
            .then(res => {
                if (res.data.status) {
                    const orders = res.data.orders
                    const customer = res.data.customer
                    this.setState({ orders, customer })
                    return
                }


                let errors = ErrorHandler(res)
                ToastsStore.error("Failed to fetch orders : " + errors.join(', '), 3000)

                if (res.data.code === 401) {
                    this.props.removeToken()
                    setTimeout(() => {
                        this.props.history.push({
                            pathname: '/signin', state: 'orders'
                        })
                        
                    }, 3000)
                }
            })
            .catch(err => {
                let errors = ErrorHandler(err)

                ToastsStore.error("Failed to fetch orders : " + errors.join(', '))
            })
    }


    onPayingOut(order) {
        const cust = this.state.customer
        console.log('order: ', order)
        const pretotal = parseFloat(order.total_amount) + parseFloat(order.Shipping.shipping_cost)
        const taxCalc = (order.Tax.tax_percentage / 100) * pretotal
        let total = (pretotal + taxCalc).toFixed(2)
        const amount = total.toString().replace('.', '')
        const itemNames = order.OrderDetails.map(item => item.product_name).join(', ')


        const self = this
        Checkout({
            name: "Shopper Now",
            description: "You are about to pay your orders: " + itemNames,
            amount: amount,
            email: cust.email

        // callback once process done
        }, (token) => {

            Network({ token: self.props.token })
            .put('/api/orders', { 
                orderId: order.order_id,
                token: token.id,
                currency: 'usd',
                amount: total,
                description: 'Paid $' + total + ' for orders : ' + itemNames
            })

            // success
            .then(res => {
                if (res.data.status) {
                    console.log('success')
                }
            })

            // fail
            .catch(err => {
                console.log('error : ', err)
            })

        })

    }


    render() {
        return (
            <Container>
                <Row>
                    <ToastsContainer 
                            position={ToastsContainerPosition.TOP_CENTER}
                            store={ToastsStore} 
                            lightBackground />
                    <Col md={12}>
                        <h3 className="mb-3 mt-3">
                            <i className="fa fa-shopping-bag"></i> Order List
                        </h3>
                        <ListOrder orders={this.state.orders} onPayingOut={this.onPayingOut.bind(this)}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (OrderIndex)