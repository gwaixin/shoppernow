import React from 'react'
import { Network, ErrorHandler } from '../helpers'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import ListOrder from './ListOrder'


const mapStateToProps = state => {
    return { token: state.token }
}

class OrderIndex extends React.Component {

    state = {
        orders: [],
    }

    componentDidMount() {
        Network({ token: this.props.token })
            .get('/api/orders')
            .then(res => {
                if (res.data.status) {
                    const orders = res.data.orders
                    this.setState({ orders })
                    return
                }
                

                let errors = ErrorHandler(res)
                ToastsStore.error("Failed to fetch orders : " + errors.join(', '))
            })
            .catch(err => {
                let errors = ErrorHandler(err)

                ToastsStore.error("Failed to fetch orders : " + errors.join(', '))
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
                    <Col md={8}>
                        <h3 className="mb-3 mt-3">
                            <i className="fa fa-shopping-bag"></i> Order List
                        </h3>
                        <ListOrder orders={this.state.orders}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps) (OrderIndex)