import React, { Component } from 'react'
import { Form, Button, Card, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { paymentUpdate } from '../../store/actions/authActions'

export class PaymentInformation extends Component {
    state = {
        bankAccountNumber : "",
        sortCode : "",
        newbankAccountNumber : "",
        newsortCode : "",       
        check : false,
        message : ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    accountType = (n,p) => {
        if(p){return "Premium Trader"}
        else if(n==="trader"){ return "Trader"}
        else if(n==="analyst"){ return "Analyst" }
        else{ return "Administrator" }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {profile} = this.props;
        if(profile.bankAccountNumber !== this.state.bankAccountNumber || profile.sortCode !== this.state.sortCode){
            this.setState({
                check : true,
                message : "Invalid Credentials"
            })
        }
        else{
            let u = {
                bankAccountNumber : this.state.newbankAccountNumber,
                sortCode : this.state.newsortCode
            }
            this.props.paymentUpdate(u)
            this.setState({
                check : true,
                message : "Successfully Updated"
            })
        }
    }

    render() {
        const {profile, auth } = this.props;
        const accountNumber = "XXXXX" + profile.bankAccountNumber.charAt(5) + profile.bankAccountNumber.charAt(6) + profile.bankAccountNumber.charAt(7)
        const sc = "XXXX" +  profile.sortCode.charAt(4) + profile.sortCode.charAt(5) 
        return (
            <div>
                <Alert variant="dark">
                    <Alert.Heading as="h5">At A Glance</Alert.Heading>
                    {profile.firstname} {profile.lastname} - {this.accountType(profile.account,profile.premium)} <br></br>
                    {auth.email}
                </Alert>
                <Card>
                    <Card.Header as="h6">Payment Card Information</Card.Header>
                    <Card.Body>
                        <Alert variant="dark">
                            Previous Bank Account Number : {accountNumber}
                            <br></br>
                            Previous Sort Code : {sc}
                        </Alert>
                        <Form autocomplete="off" id="payment" onSubmit ={this.handleSubmit}>
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
                        {this.state.check  ? 
                            this.state.message === "Successfully Updated" ?
                            <Alert variant="success"><div><label>{this.state.message}</label></div></Alert>:
                            <Alert variant="danger"><div><label>{this.state.message}</label></div></Alert>
                            :
                            null
                        }
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="success" form="payment" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        paymentUpdate : (user) => dispatch(paymentUpdate(user)),
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        emailError : state.auth.emailError,
        notifications : state.firestore.ordered.notifications,
        users : state.firestore.ordered.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformation)
