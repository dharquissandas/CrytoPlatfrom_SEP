import React, { Component } from 'react'
import { Container, Form, Jumbotron, Button, Card, Col, Alert, Tab} from 'react-bootstrap';

export class PaymentInformation extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="H5">Payment Card Information</Card.Header>
                    <Card.Body>
                        <Alert variant="dark">
                            Previous Bank Account Number : XXXXXXXX
                            <br></br>
                            Previous Sort Code : XXXXXX
                        </Alert>
                        <Form autocomplete="off" id="register" onSubmit ={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="bankAccountNumber">
                            <Form.Label>Previous Bank Number</Form.Label>
                            <Form.Control type="text" maxLength="8" required placeholder="Previous Bank Account Number" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="sortCode">
                            <Form.Label>Previous Sort Code</Form.Label>
                            <Form.Control type="text" maxLength="6" required placeholder="Previous Sort Code" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="newbankAccountNumber">
                            <Form.Label>Bank Number</Form.Label>
                            <Form.Control type="text" maxLength="8" required placeholder="Bank Account Number" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="newsortCode">
                            <Form.Label>Sort Code</Form.Label>
                            <Form.Control type="text" maxLength="6" required placeholder="Sort Code" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

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

export default PaymentInformation
