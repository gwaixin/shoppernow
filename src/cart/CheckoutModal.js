import React from 'react'
import { Form, Col, Table, Button, Image } from 'react-bootstrap'
import CustomModal from '../component/CustomModal'
import Price from '../component/Price'
import { Network, ErrorHandler } from '../helpers'

class CheckoutModal extends React.Component {

    state = {
        shippings: [],
        taxes: [],
        selectShipping: {},
        selectTax: {},
        computeTax: 0,
        total: 0
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isShow && this.state.taxes.length === 0) {
            // fetch tax options
            Network()
                .get('/api/orders/taxes')
                .then(res => {
                    if (res.data.status) {
                        const taxes = res.data.taxes
                        const selectTax = taxes[0]
                        this.setState({ taxes, selectTax}, this.computeTotal)
                    } else {
                        let errors = ErrorHandler(res)
                        this.props.onHide()
                        alert('error: ' + errors.join(', '))
                    }
                })
                .catch(err => {
                    let errors = ErrorHandler(err)
                    this.props.onHide()
                    alert('errors: ' + errors.join(', '))
                })

            // fetch shipping options
            Network()
                .get('/api/orders/shippings')
                .then(res => {
                    if (res.data.status) {
                        const shippings = res.data.shippings
                        const selectShipping = shippings[0]
                        this.setState({ shippings, selectShipping }, this.computeTotal)
                    } else {
                        let errors = ErrorHandler(res)
                        this.props.onHide()
                        alert('error: ' + errors.join(', '))
                    }
                })
                .catch(err => {
                    let errors = ErrorHandler(err)
                    this.props.onHide()
                    alert('errors: ' + errors.join(', '))
                })

        }
    }


    computeTotal() {
        let total = 0
        let computeTax = 0
        this.props.cart.forEach(item => { 
            const newprice = parseFloat(item.Product.discounted_price) === 0 ? item.Product.price : item.Product.discounted_price
            total += newprice * item.quantity
        })

        // shipping fee + taxes
        if (this.state.selectShipping.shipping_cost) {
            total += Number(this.state.selectShipping.shipping_cost)
        }

        // compute tax
        if (this.state.selectTax.tax_percentage) {
            computeTax = (total / 100 ) * this.state.selectTax.tax_percentage
            total += computeTax 
        }


        this.setState({ total, computeTax })
    }


    onChangeShipping(e) {
        const shipindex = this.state.shippings.findIndex(ship => ship.shipping_id == e.currentTarget.value)
        const selectShipping = this.state.shippings[shipindex]
        this.setState({ selectShipping }, this.computeTotal)
    }

    onChangeTax(e) {
        const selectTax = this.state.taxes[e.currentTarget.value]
        this.setState({ selectTax }, this.computeTotal)
    }

    onSubmitCheckout(e) {
        e.preventDefault()

        // just preparing form data to checkout
        const formData = {
            inShippingId: this.state.selectShipping.shipping_id,
            inTaxId: this.state.selectTax.tax_id
        }

        // execute final checkout
        this.props.onFinalCheckout(formData)
    }

    render() {


        if (!this.props.cart) { return null }

        const formCheckout = (
            <Form onSubmit={this.onSubmitCheckout.bind(this)}>
                <Form.Row>

                    <Form.Group as={Col}>
                        <Form.Label>Shipping Mode</Form.Label>
                        <Form.Control as="select" onChange={this.onChangeShipping.bind(this)}>
                        {
                            this.state.shippings
                                .map((shipping, index) => (
                                    <option key={`opt-shp-${index}`} value={shipping.shipping_id}>
                                        {shipping.shipping_type} : {shipping.shipping_region}
                                    </option>
                                ))
                        }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Tax</Form.Label>
                        <Form.Control as="select" onChange={this.onChangeTax.bind(this)}>
                        {
                            Object
                                .entries(this.state.taxes)
                                .map((tax, index) => (
                                    <option key={`opt-tax-${index}`} value={tax[0]}>{tax[1].tax_type}</option>
                                ))
                        }
                        </Form.Control>
                    </Form.Group>

                </Form.Row>

                <Form.Group>
                    <Form.Label>Order Details</Form.Label>
                    <Table striped hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-center">Product name</th>
                                <th>Details</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-right">Cost</th>
                                <th className="text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.cart.map((item, index) => {
                                    const product = item.Product
                                    const newprice = parseFloat(product.discounted_price) === 0 ? product.price : product.discounted_price
                                    return (
                                        <tr key={`item-${index}`}>
                                            <td width="100"><Image src={`/images/products/${product.thumbnail}`} fluid thumbnail /></td>
                                            <td className="text-center">{product.name}</td>
                                            <td>
                                               <small>
                                               { 
                                                    // item.attributes.map((attr, ii) => {
                                                    //     return (<div key={`detail-${index}-${ii}`}><b>{ attr.type }</b> : { attr.value }</div>)
                                                    // }) 
                                               }
                                               </small>
                                            </td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-right"><Price value={newprice} /></td>
                                            <td className="text-right"><Price value={newprice * item.quantity} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="text-right">
                                    <small><b>Shipping Fee</b></small>
                                </td>
                                <td className="text-right">
                                    <small>
                                        <Price value={this.state.selectShipping.shipping_cost} />
                                    </small>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="text-right">
                                    <small><b>% Tax</b></small>
                                </td>
                                <td className="text-right">
                                    <small>
                                        <Price value={this.state.computeTax} />
                                    </small>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="text-right"><h5>Total</h5></td>
                                <td className="text-right"><h5><Price value={this.state.total} /></h5></td>
                            </tr>
                        </tfoot>
                    </Table>
                </Form.Group>

                <Form.Group className="text-right">
                    <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
                    <Button className="ml-1" variant="primary" type="submit">Continue Checkout</Button>
                </Form.Group>
            </Form>
        )

        return (
            <CustomModal 
                isShow={this.props.isShow}
                onHide={this.props.onHide}
                size="xl"
                title="Checking Out Cart"
                body={formCheckout} />
        )
    }
}

export default CheckoutModal
