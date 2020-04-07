import React, { Component } from 'react'
import {Modal, Button, Form, Col, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateFiatWallet } from '../store/actions/walletActions';
import { upgrade } from '../store/actions/authActions';

export class Upgrade extends Component {
    state = {
        bankAccountNumber : "",
        sortCode : "",
        message : "",
        check: false,
        error : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleCheckChange = (e) => {
        this.setState({
            check : ! this.state.check,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let profile = this.props.profile

        if ((this.state.bankAccountNumber !== profile.bankAccountNumber) || (this.state.sortCode !== profile.sortCode)){
            this.setState({
                message: "Bank Details Invalid",
                error : true
            })
        }   
        else if(!this.state.check){
            this.setState({
                message: "Acknowledgment Compulsory",
                error : true
            })
        }
        else{
            this.props.upgrade(true)
            this.props.onHide()
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
                            Premium Trader Upgrade
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
                                    <Form.Control required type="text" minLength="8" maxLength="8" placeholder="Bank Account number" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="sortCode">
                                    <Form.Label>Sort Code</Form.Label>
                                    <Form.Control required type="text" minlength="8" maxLength="6" placeholder="Sort Code" onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="fullAmount">
                                <Form.Check type="checkbox" label="Acknowledgement for £9.99 To Be Debited Monthly " onChange={this.handleCheckChange} />
                            </Form.Group>                    
                        </Form>
                        
                        {this.state.error ? <Alert variant="danger">{this.state.message}</Alert> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Form.Group>
                            <Button form="fiatRefund" type="submit" variant="success" onClick={this.handleSubmit}>Upgrade</Button>
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
        notifications : state.firestore.ordered.notifications
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateFiatWallet : (wallet) => dispatch(updateFiatWallet(wallet)) ,
        upgrade : (bool) => dispatch(upgrade(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upgrade)
