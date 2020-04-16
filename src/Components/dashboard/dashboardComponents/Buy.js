import React, { Component } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'
import { Transact } from '../../store/actions/transactionActions';

export class Buy extends Component {
    state = {
        buycryptocurrency : "",
        buyamount: "",
        buycheck: false,
        buymessage : "",
        cc1 : cc1.getCC1(),
        cc1Name : cc1.getName(),
        cc1Prices : cc1.getPrices(),
        cc1CurrentPrice : cc1.getCurrentPrice(),
        cc2 : cc2.getCC2(),
        cc2Name : cc2.getName(),
        cc2Prices : cc2.getPrices(),
        cc2CurrentPrice : cc2.getCurrentPrice(),
        cc3 : cc3.getCC3(),
        cc3Name : cc3.getName(),
        cc3Prices : cc3.getPrices(),
        cc3CurrentPrice : cc3.getCurrentPrice(),
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleBuySubmit = (e) => {
        e.preventDefault();
        let transactionType = "buy"
        let cc = this.state.buycryptocurrency
        let totalPrice = 0
        let purchasePrice = 0

        if(cc === "Choose Cryptocurrency" || cc === "" ){
            this.setState({
                buycheck : true,
                buymessage : "Please Select A Valid Cryptocurrency"
            })
        }
        else{
            this.setState({
                buycheck : false,
                buymessage : "Transaction Complete"
            })

            if(cc === this.state.cc1Name){
                purchasePrice = this.state.cc1CurrentPrice
                totalPrice = this.state.buyamount * this.state.cc1CurrentPrice
            }
            else if(cc === this.state.cc2Name){
                purchasePrice = this.state.cc2CurrentPrice
                totalPrice = this.state.buyamount * this.state.cc2CurrentPrice
            }
            else{
                purchasePrice = this.state.cc3CurrentPrice
                totalPrice = this.state.buyamount * this.state.cc3CurrentPrice
            }

            let transactionState = {
                transactionType : transactionType,
                cryptocurrency : cc,
                purchasedAmount : this.state.buyamount,
                purchasePrice : purchasePrice,
                totalPrice : totalPrice
            }


            if(totalPrice > parseFloat(this.props.profile.fiatAmount)){
                this.setState({
                    buycheck : true,
                    buymessage : "You have insufficient funds for the transaction"
                })
            }
            else{
                this.props.transact(transactionState)
                document.getElementById("buy").reset();
            }
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <Card bg="dark" text="white" border="info">
                <Card.Header as="h6">Buy Cryptocurrency</Card.Header>
                <Card.Body>
                        <Form autocomplete="off" id="buy" onSubmit ={this.handleBuySubmit}>
                            <Form.Group controlId="buycryptocurrency">
                                <Form.Label>Cryptocurrency</Form.Label>
                                <Form.Control required onChange={this.handleChange} as="select" custom>
                                    <option>Choose Cryptocurrency</option>
                                    <option>{this.state.cc1Name}</option>
                                    <option>{this.state.cc2Name}</option>
                                    <option>{this.state.cc3Name}</option>
                                </Form.Control>
                            </Form.Group> 
                            <Form.Group controlId="buyamount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control required type="number" min="1" max="10" placeholder="Amount" onChange={this.handleChange} />
                            </Form.Group>
                            {this.state.buycheck  ? 
                                <Alert variant="danger"><div><label>{this.state.buymessage}</label></div></Alert>:
                                this.state.buymessage === "Transaction Complete" ?
                                <Alert variant="success"><div><label>{this.state.buymessage}</label></div></Alert>:
                                null
                            }
                        </Form>
                </Card.Body>
                <Card.Footer><Button variant="info" form="buy" type="submit">Purchase</Button></Card.Footer>
            </Card>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transact : (transaction) => dispatch(Transact(transaction))
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

export default connect(mapStateToProps, mapDispatchToProps)(Buy)
