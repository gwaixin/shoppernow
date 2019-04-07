import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="text-danger">
                        <h1>{ props.message }</h1>
                        <Button as={Link} to="/">Go Home</Button>    
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound