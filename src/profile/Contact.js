import React from 'react'
import { Form } from 'react-bootstrap'


const Contact = (props) => {
    return(
        <div>
            <Form.Group controlId="formPhoneMobile">
                <Form.Label>Mobile Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter mobile phone number" name="mob_phone" defaultValue={ props.mobPhone } />
                <Form.Text className="text-muted">+Area Code and mobile phone number</Form.Text>
            </Form.Group>
            
            <Form.Group controlId="formPhoneDay">
                <Form.Label>Day Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number use during the day" name="day_phone" defaultValue={ props.dayPhone } />
            </Form.Group>

            <Form.Group controlId="formPhoneEvening">
                <Form.Label>Evening Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number use during the evening." name="eve_phone" defaultValue={ props.evePhone } />
            </Form.Group>
            
        </div>
    )
}

export default Contact