import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Setting from './Setting'

class IndexAccount extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card border="dark" bg="light">
                            <Card.Header>
                                <h2 className="mt-2"><i className="fa fa-wrench"></i> Account Settings</h2>
                            </Card.Header>
                            <Card.Body>
                                <Setting />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default IndexAccount