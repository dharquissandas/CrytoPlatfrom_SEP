import React, { Component } from 'react'
import { Row, Col, Card, Form, InputGroup, Button, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import { updateFiatWallet } from '../../store/actions/walletActions';


export class FiatWallet extends Component {
    state = {
        addCardNumber : "",
        addExpiryDate : "",
        addCvv : "",
        addAmount : "",
        addMessage : "",
        addCheck : false,

        rBankAccountNumber : "",
        rSortCode : "",
        ramount : "",
        rmessage : "",
        rfullAmount: false,
        rcheck : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddSubmit = (e) => {
        e.preventDefault()
        let a = {
            type: "add",
            bankAccountNumber : this.state.addBankAccountNumber,
            sortCode : this.state.addSortCode,
            Cvv : this.state.addCvv,
            amount : this.state.addAmount 
        }
        this.props.updateFiatWallet(a)
        document.getElementById("fiatTransact").reset()

        this.setState({
            addCheck : true,
            addMessage : "Fiat Wallet Updated"
        })
    }



    handleCheckChange = (e) => {
        this.setState({
            rfullAmount : ! this.state.rfullAmount,
        })
        if(this.state.rfullAmount){
            document.getElementById("ramount").value = ""
            this.setState({
                ramount : ""
            })
        }
        else{
            document.getElementById("ramount").value = this.props.profile.fiatAmount
            this.setState({
                ramount : this.props.profile.fiatAmount
            })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        let profile = this.props.profile

        const info = {
            type : "refund",
            bankAccountNumber : this.state.rbankAccountNumber,
            sortCode : this.state.rsortCode,
            amount : this.state.ramount
        }

        if ((this.state.rbankAccountNumber === profile.bankAccountNumber) && (this.state.rsortCode === profile.sortCode)){
            this.props.updateFiatWallet(info)
            this.setState({
                rmessage: "Refund Successful",
                rcheck : true
            })
            document.getElementById("fiatRefund").reset()
        }
        else{
            this.setState({
                rmessage: "Bank Details Invalid",
                rcheck : true
            })
        }
    }

    render() {
        const {profile} = this.props;
        const accountNumber = "XXXXX" + profile.bankAccountNumber.charAt(5) + profile.bankAccountNumber.charAt(6) + profile.bankAccountNumber.charAt(7)
        const sc = "XXXX" +  profile.sortCode.charAt(4) + profile.sortCode.charAt(5) 
        return (
            <div>
                <Row>
                    <Col sm>
                        <Card>
                            <Card.Header as="h6">Add Fiat Currency</Card.Header>
                            <Card.Body>
                                <Form autocomplete="off" id="fiatTransact" onSubmit={this.handleAddSubmit}>
                                    <Form.Group controlId="addCardNumber">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control required type="text" pattern="[0-9]{16}" title="" minLength="16" maxLength="16" placeholder="Card Number" onChange={this.handleChange} />
                                </Form.Group>
                                    <Form.Group controlId="addExpiryDate">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control required type="date" min={new Date().toISOString().substr(0,10)} onChange={this.handleChange} />
                                    </Form.Group>

                                    <Form.Group controlId="addCvv">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control required type="text" pattern="[0-9]{3}" minLength="3" maxLength="3" placeholder="CVV" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="addAmount">
                                        <Form.Label>Amount</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">£</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control required type="number" min="0.01" step="any" placeholder="Amount" onChange={this.handleChange} />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                {this.state.addCheck ?
                                <Alert variant="success">{this.state.addMessage}</Alert>:
                                null}
                            </Card.Body>
                            <Card.Footer>
                                    <Button form="fiatTransact"  type="submit" variant="success">Transact</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card>
                            <Card.Header as="h6">Fiat Currency Refund</Card.Header>
                            <Card.Body> 
                                <h6>Please enter the details of the card below for verification</h6>
                                <Alert style={{marginBottom : "31px" }} variant="dark">
                                    Bank Account Number : {accountNumber}
                                    <br></br>
                                    Sort Code : {sc} 
                                </Alert>
                                <Form autocomplete="off" id="fiatRefund" onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="rbankAccountNumber">
                                            <Form.Label>Account Number</Form.Label>
                                            <Form.Control required type="text" minLength="8" maxLength="8" placeholder="Bank Account number" onChange={this.handleChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="rsortCode">
                                            <Form.Label>Sort Code</Form.Label>
                                            <Form.Control required type="text" minLength="6" maxLength="6" placeholder="Sort Code" onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group controlId="rfullAmount">
                                        <Form.Check type="checkbox" label="Refund Full Amount" onChange={this.handleCheckChange} />
                                    </Form.Group> 
                                    <Form.Group controlId="ramount">
                                    <Form.Label>Amount</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">£</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control required type="number" min="0.01" max={profile.fiatAmount} step="any" placeholder="Amount" onChange={this.handleChange} />
                                    </InputGroup>
                                    </Form.Group>                     
                                </Form>
                                {this.state.rcheck  ? 
                                    this.state.rmessage === "Refund Successful" ?
                                    <Alert variant="success"><div><label>{this.state.rmessage}</label></div></Alert>:
                                    <Alert variant="danger"><div><label>{this.state.rmessage}</label></div></Alert>
                                    :
                                    null
                                }
                            </Card.Body>
                            <Card.Footer>
                                    <Button form="fiatRefund" type="submit" variant="success" >Refund</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(FiatWallet)