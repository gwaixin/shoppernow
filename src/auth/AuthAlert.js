import React from 'react'
import { Alert } from 'react-bootstrap'

const AuthAlert = (props) => {
    if (props.errors && props.errors.length > 0) {
        return (
            <Alert variant="danger">
                <Alert.Heading><i className="fas fa-exclamation-triangle"></i> Signup Failed!!</Alert.Heading>
                <ul>
                { props.errors.map((e, index) => <li key={`error-${index}`}>{e}</li>) }
                </ul>
            </Alert>
        )
    } else if (props.success === 'success') {
        return (
            <Alert variant="success">
                <Alert.Heading>
                    <i className="fas fa-check-circle"></i> { props.title }!!
                </Alert.Heading>
                <p>{ props.message }</p>
            </Alert>
        )
    } else if (props.info) {
        return (
            <Alert variant="info">
                <Alert.Heading>
                    <i className="fas fa-info"></i> { props.title }!!
                </Alert.Heading>
                <p>{ props.message }</p>
            </Alert>
        )
    } else {
        return null
    }
}

export default AuthAlert