import React, { Component } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'
import { Transact } from '../../store/actions/transactionActions';
import Search from 'react-search'
import {userData, findUser} from '../../utils/DashboardUtils'

export class Transfer extends Component {
    state = {
        transfercryptocurrency : "",
        transferamount: "",
        transfermessage : "",
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
        transferRecipient : null,
        transferPackage : {}
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    setTransferRecipient = (items) => {
        this.setState({
            transferRecipient : items[0]
        })
    }

    handleTransfer = async (e) => {
        e.preventDefault()

        if(this.state.transferRecipient == null){
            this.setState({
                transfercheck : true,
                transfermessage : "Please Select A Recipient"
            })
        }
        else if(this.state.transfercryptocurrency === "Choose Cryptocurrency" || this.state.transfercryptocurrency === "" ){
            this.setState({
                tranfercheck : true,
                transfermessage : "Please Select A Valid Cryptocurrency"
            })
        }
        else{
            if((this.state.transfercryptocurrency === this.state.cc1Name && this.state.transferamount > this.props.finalData.cc1Amount) ||
               (this.state.transfercryptocurrency === this.state.cc2Name && this.state.transferamount > this.props.finalData.cc2Amount) ||
               (this.state.transfercryptocurrency === this.state.cc3Name && this.state.transferamount > this.props.finalData.cc3Amount)) {
                this.setState({
                    transfercheck : true,
                    transfermessage : "Insufficient Cryptocurrency"
                })
            }
            else{
                let recipient = this.state.transferRecipient
                let amount = this.state.transferamount
                let cc = this.state.transfercryptocurrency
                recipient = findUser(this.props.auth.uid,this.props.users,recipient, "trader")
                let info = {
                    transactionType : "transfer",
                    cryptocurrency : cc,
                    purchasedAmount : amount,
                    recipientid : recipient.id,
                    recipientemail : recipient.em,
                    senderemail: this.props.auth.email
                }

                this.setState({
                    transferPackage : info
                })

                await this.props.transact(info)
                this.setState({
                    transfercheck : true,
                    transfermessage : "Transaction Complete, Please Wait a short while the transfer to be reflected"
                })

                setTimeout(() => {
                    window.location.reload()
            }, 1000);



                document.getElementById("transfer").reset();
            }
        }
    }


    render() {
        const { auth, users } = this.props;
        let items = userData(users, auth.uid, "trader")
        return (
            <div>
                <br></br>
                <Card bg="dark" text="white" border="info">
                <Card.Header as="h6">Transfer Cryptocurrency</Card.Header>
                <Card.Body>
                    <Form autocomplete="off" id="transfer" onSubmit={this.handleTransfer}>
                        <Form.Group id="search">
                            <Form.Label>Recipient</Form.Label>
                            <Search items={items}
                                placeholder='Search Email of Recipient'
                                maxSelected={1}
                                multiple={true}
                                autocomplete="off"
                                onItemsChanged={this.setTransferRecipient.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId="transfercryptocurrency">
                            <Form.Label>Cryptocurrency</Form.Label>
                            <Form.Control required onChange={this.handleChange} as="select" custom>
                                <option>Choose Cryptocurrency</option>
                                <option>{this.state.cc1Name}</option>
                                <option>{this.state.cc2Name}</option>
                                <option>{this.state.cc3Name}</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="transferamount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control required type="number" min="1" max="10" placeholder="Amount" onChange={this.handleChange} />
                        </Form.Group>
                        {this.state.transfercheck  ? 
                            this.state.transfermessage === "Transaction Complete, Please Wait a short while the transfer to be reflected" ?
                            <Alert variant="success"><div><label>{this.state.transfermessage}</label></div></Alert>:
                            <Alert variant="danger"><div><label>{this.state.transfermessage}</label></div></Alert>
                            :
                            null
                        }   
                    </Form>
                </Card.Body>
                <Card.Footer><Button variant="info" form="transfer" type="submit">Transfer</Button></Card.Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Transfer)
