import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

const Setting = (props) => {
    return (
        <Form>
            <Form.Group controlId="formOldPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" placeholder="Old Password" />
                <Form.Text className="text-muted">
                    Please enter the old password first.
                </Form.Text>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md={6} controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>

                <Form.Group as={Col} md={6} controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>
            </Form.Row>

            <Form.Group>
                <Button type="submit">Update Account</Button>
            </Form.Group>
        </Form>
    )
}

export default Setting