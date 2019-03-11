import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const Location = (props) => {
    return (
        <div>
            <Row>
                <Form.Group as={Col} md="6" controlId="formAddress1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address # 1"
                        defaultValue={ props.profile.address_1 }
                        name="address_1" />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address # 2"
                        defaultValue={ props.profile.address_2 }
                        name="address_2" />
                </Form.Group>
            </Row>
                
            <Row>
                <Form.Group as={Col} md="6" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter City"
                        defaultValue={ props.profile.city }
                        name="city" />
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formRegion">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Region"
                        defaultValue={ props.profile.region }
                        name="region" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group as={Col} md="6" controlId="formPostal">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Postal"
                        defaultValue={ props.profile.postal_code }
                        name="postal_code" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        defaultValue={ props.profile.country }
                        name="country" />
                </Form.Group>
            </Row>
        </div>
    )
}

export default Location