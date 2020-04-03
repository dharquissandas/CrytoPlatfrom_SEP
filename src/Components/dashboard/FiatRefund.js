import React, { Component } from 'react'
import {Modal, Button, Form, Col, InputGroup, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateFiatWallet } from '../store/actions/walletActions';

export class AddFiatCurrency extends Component {
    state = {
        type : "refund",
        bankAccountNumber : "",
        sortCode : "",
        amount : "",
        message : "",
        fullAmount: false,
        error : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCheckChange = (e) => {
        this.setState({
            fullAmount : ! this.state.fullAmount,
        })
        if(this.state.fullAmount){
            document.getElementById("amount").value = ""
            this.setState({
                amount : ""
            })
        }
        else{
            document.getElementById("amount").value = this.props.profile.fiatAmount
            this.setState({
                amount : this.props.profile.fiatAmount
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let profile = this.props.profile

        const info = {
            type : this.state.type,
            bankAccountNumber : this.state.bankAccountNumber,
            sortCode : this.state.sortCode,
            amount : this.state.amount
        }

        if ((this.state.bankAccountNumber === profile.bankAccountNumber) && (this.state.sortCode === profile.sortCode)){
            this.props.updateFiatWallet(info)
            this.props.onHide()
        }   
        else{
            this.setState({
                message: "Bank Details Invalid",
                error : true
            })
        }
    }

    render() {
        const {profile} = this.props;
        const accountNumber = "XXXXX" + profile.bankAccountNumber.charAt(5) + profile.bankAccountNumber.charAt(6) + profile.bankAccountNumber.charAt(7)
        const sc = "XXXX" +  profile.sortCode.charAt(4) + profile.sortCode.charAt(5) 
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
                            Fiat Currency Refund
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Please enter the details of the card displayed below for verification</h6>
                        <Alert variant="dark">
                            Bank Account Number : {accountNumber}
                            <br></br>
                            Sort Code : {sc} 
                        </Alert>
                        <Form autocomplete="off" id="fiatRefund">
                            <Form.Row>
                                <Form.Group as={Col} controlId="bankAccountNumber">
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control required type="text" maxLength="8" placeholder="Bank Account number" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="sortCode">
                                    <Form.Label>Sort Code</Form.Label>
                                    <Form.Control required type="text" maxLength="6" placeholder="Sort Code" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="fullAmount">
                                <Form.Check type="checkbox" label="Refund Full Amount" onChange={this.handleCheckChange} />
                            </Form.Group> 
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
                        {this.state.error ? <span>{this.state.message}</span> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group>
                            <Button form="fiatRefund" type="submit" variant="success" onClick={this.handleSubmit}>Refund</Button>
                        </Form.Group>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFiatWallet : (wallet) => dispatch(updateFiatWallet(wallet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFiatCurrency)
