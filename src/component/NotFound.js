import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const NotFound = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="text-danger">
                        <h1>{ props.message }</h1>
                        <Button>Go Home</Button>    
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound