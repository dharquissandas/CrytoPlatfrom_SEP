import React, { Component } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'
import { Transact } from '../../store/actions/transactionActions';

export class Sell extends Component {
    state = {
        sellcryptocurrency : "",
        sellamount: "",
        sellcheck: false,
        sellmessage : "",
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
        cc3CurrentPrice : cc3.getCurrentPrice()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSellSubmit = (e) => {
        e.preventDefault();
        let transactionType = "sell"
        let cc = this.state.sellcryptocurrency
        let totalPrice = 0
        let salePrice = 0

        if(cc === "Choose Cryptocurrency" || cc === "" ){
            this.setState({
                sellcheck : true,
                sellmessage : "Please Select A Valid Cryptocurrency"
            })
        }
        else{
            this.setState({
                sellcheck : false,
                sellmessage : "Transaction Complete"
            })

            if(cc === this.state.cc1Name){
                salePrice = this.state.cc1CurrentPrice
                totalPrice = this.state.sellamount * this.state.cc1CurrentPrice
                totalPrice = "" + totalPrice
            }
            else if(cc === this.state.cc2Name){
                salePrice = this.state.cc2CurrentPrice
                totalPrice = this.state.sellamount * this.state.cc2CurrentPrice
                totalPrice = "" + totalPrice
            }
            else{
                salePrice = this.state.cc3CurrentPrice
                totalPrice = this.state.sellamount * this.state.cc3CurrentPrice
                totalPrice = "" + totalPrice
            }

            let transactionState = {
                transactionType : transactionType,
                cryptocurrency : cc,
                purchasedAmount : this.state.sellamount,
                purchasePrice : salePrice,
                totalPrice : totalPrice
            }

            
            if((cc === this.state.cc1Name && this.state.sellamount > this.props.finalData.cc1Amount) ||
               (cc === this.state.cc2Name && this.state.sellamount > this.props.finalData.cc2Amount) ||
               (cc === this.state.cc3Name && this.state.sellamount > this.props.finalData.cc3Amount)) {
                this.setState({
                    sellcheck : true,
                    sellmessage : "Insufficient Cryptocurrency"
                })
            }
            else{
                this.props.transact(transactionState)
                document.getElementById("sell").reset();
            }
        }       
    }

    render() {
        return (
            <Card>
            <Card.Header as="h6">Sell Cryptocurrency</Card.Header>
            <Card.Body>
                    <Form autocomplete="off" id="sell" onSubmit ={this.handleSellSubmit}>
                        <Form.Group controlId="sellcryptocurrency">
                            <Form.Label>Cryptocurrency</Form.Label>
                            <Form.Control required onChange={this.handleChange} as="select" custom>
                                <option>Choose Cryptocurrency</option>
                                <option>{this.state.cc1Name}</option>
                                <option>{this.state.cc2Name}</option>
                                <option>{this.state.cc3Name}</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="sellamount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control required type="number" min="1" max="10" placeholder="Amount" onChange={this.handleChange} />
                        </Form.Group>
                        {this.state.sellcheck  ? 
                            <Alert variant="danger"><div><label>{this.state.sellmessage}</label></div></Alert>:
                            this.state.sellmessage === "Transaction Complete" ?
                            <Alert variant="success"><div><label>{this.state.sellmessage}</label></div></Alert>:
                            null
                        }   
                        </Form>
            </Card.Body>
            <Card.Footer><Button variant="success" form="sell" type="submit">Sell</Button></Card.Footer>
            </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sell)
