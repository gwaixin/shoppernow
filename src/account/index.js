import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Setting from './Setting'
import { removeToken } from '../assets/js/actions/index'
import { Network, ErrorHandler } from '../helpers'
import { connect } from 'react-redux'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts'


const mapStateToProps = state => {
    return { token: state.token }
}

const mapDispatchToProps = dispatch => {
    return { removeToken: () => dispatch(removeToken()) }
}

class IndexAccount extends React.Component {

    onChangePassword(e) {
        e.preventDefault()

        let formData = {
            password: e.currentTarget['password'].value,
            password_new: e.currentTarget['password_new'].value,
            password_confirm: e.currentTarget['password_confirm'].value,
        }

        

        Network({ token: this.props.token })
            .put('/api/auth/password', formData)
            .then(res => {
                if (res.data.status) {
                    ToastsStore.success("Congratulations, password changed!", 1000)
                    this.props.removeToken()
                    setTimeout(() => {
                        this.props.history.push('/signin')
                    }, 1000)

                    return
                } else {

                    let errors = ErrorHandler(res)

                    ToastsStore.error("Failed to change password!\n " + errors.join(', '))
                }
            })
            .catch(e => {
                ToastsStore.error("Failed to change password!\n Please try again. " + e)
            })
       
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ToastsContainer 
                            position={ToastsContainerPosition.TOP_CENTER}
                            store={ToastsStore} 
                            lightBackground />

                        <Card border="dark" bg="light">
                            <Card.Header>
                                <h2 className="mt-2"><i className="fa fa-wrench"></i> Account Settings</h2>
                            </Card.Header>
                            <Card.Body>
                                <Setting onChangePassword={ this.onChangePassword.bind(this) }/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (IndexAccount)