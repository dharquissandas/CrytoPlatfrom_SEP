import React, { Component } from 'react'
import {Modal, Button, Form, Col, InputGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateFiatWallet } from '../store/actions/walletActions';

export class AddFiatCurrency extends Component {
    state = {
        type : "add",
        bankAccountNumber : "",
        sortCode : "",
        Cvv : "",
        amount : ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateFiatWallet(this.state)
        this.props.onHide()
    }

    render() {
        return (
            <div>
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Fiat Currency
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autocomplete="off" id="fiatTransact" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="bankAccountNumber">
                                <Form.Label>Account Number</Form.Label>
                                <Form.Control required type="text" minLength="8" maxLength="8" placeholder="Bank Account number" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="sortCode">
                                    <Form.Label>Sort Code</Form.Label>
                                    <Form.Control required type="text" minLength="6" maxLength="6" placeholder="Sort Code" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control required type="text" minLength="3" maxLength="3" placeholder="CVV" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">£</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control required type="number" step="any" placeholder="Amount" onChange={this.handleChange} />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group>
                            <Button form="fiatTransact" type="submit" variant="success">Transact</Button>
                        </Form.Group>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        updateFiatWallet : (wallet) => dispatch(updateFiatWallet(wallet)) 
    }
}

export default connect(null, mapDispatchToProps)(AddFiatCurrency)
