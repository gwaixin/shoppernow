import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'

class Setting extends React.Component {

    state = {
        password: '',
        passwordNew: '',
        passwordConfirm: ''
    }

    render() {
        return (
            <div>
                <small>Remember that you will be logout once password has changed</small>
								
                <Form onSubmit={ this.props.onChangePassword }>
                    <Form.Group controlId="formOldPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Old Password" 
                            defaultValue={ this.state.password }
                            name="password" />
                        <Form.Text className="text-muted">
                            Please enter the old password first.
                        </Form.Text>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} md={6} controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="New Password" 
                                defaultValue={ this.state.passwordNew }
                                name="password_new" />
                        </Form.Group>

                        <Form.Group as={Col} md={6} controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password"
                                placeholder="Confirm Password" 
                                defaultValue={ this.state.passwordConfirm }
                                name="password_confirm" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Button type="submit">Update Password</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Setting