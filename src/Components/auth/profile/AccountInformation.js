import React, { Component } from 'react'
import { Container, Form, Jumbotron, Button, Card, Col, Row, Tab} from 'react-bootstrap';

export class AccountInformation extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="H5">Account Information</Card.Header>
                    <Card.Body>
                        <Form autocomplete="off" id="register" onSubmit ={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" onChange={this.handleChange} />
                            </Form.Group>
                                
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="success" form="register" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default AccountInformation
