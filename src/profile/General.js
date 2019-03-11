import React from 'react'
import { Form } from 'react-bootstrap'


const General = (props) => {
    return(
        <div>
            <Form.Group controlId="formBasicFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={ props.name } />
                <Form.Text className="text-muted">
                    Please provide your real name above.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCard">
                <Form.Label>Credit Card</Form.Label>
                <Form.Control type="text" placeholder="Enter credit card" name="credit_card" defaultValue={ props.credit }/>
                <Form.Text className="text-muted">
                    Card that will be use on your future transaction.
                </Form.Text>
            </Form.Group>
        </div>
    )
}

export default General