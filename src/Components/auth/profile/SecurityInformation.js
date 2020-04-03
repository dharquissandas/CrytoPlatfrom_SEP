import React, { Component } from 'react'
import { Container, Form, Jumbotron, Button, Card, Col, Row, Tab} from 'react-bootstrap';

export class SecurityInformation extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="H5">Security Information</Card.Header>
                    <Card.Body>
                        <Form autocomplete="off" id="register" onSubmit ={this.handleSubmit}>

                        <Form.Group controlId="idProof">
                            <Form.Label>Previous Proof of ID</Form.Label>
                            <Form.Control type="text" placeholder="Previous Passport or Driving License Identification Number" onChange={this.handleChange} />
                        </Form.Group>
                            
                        <Form.Group controlId="idProof">
                            <Form.Label>Proof of ID</Form.Label>
                            <Form.Control type="text" placeholder="Passport or Driving License Identification Number" onChange={this.handleChange} />
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

export default SecurityInformation
