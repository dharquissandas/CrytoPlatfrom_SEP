import React, { Component } from 'react';
import { Container, Form, Button, Card, Col, Row, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Transact } from '../store/actions/transactionActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { createData } from '../utils/WalletUtiils'
import Search from 'react-search'
import {userData, findTrader} from '../utils/DashboardUtils'
import '../../App.css'
import Navigationbar from '../layout/Navigationbar';
import Upgrade from '../auth/Upgrade';

export class Dashboard extends Component {
    state = {
        buycryptocurrency : "",
        sellcryptocurrency : "",
        transfercryptocurrency : "",
        buyamount: "",
        sellamount: "",
        transferamount: "",
        buycheck: false,
        sellcheck: false,
        transfercheck: false,
        buymessage : "",
        sellmessage : "",
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
        finalData : {},
        transferRecipient : "",
        loaded : false,
        modalShow : false
    }

    componentDidMount = () => {
        this.state.cc1.on('runSuccess', () => {
            this.setState({
                cc1Prices : cc1.getPrices(),
                cc1CurrentPrice : cc1.getCurrentPrice()
            })
        });

        this.state.cc2.on('runSuccess', () => {
            this.setState({
                cc2Prices : cc2.getPrices(),
                cc2CurrentPrice : cc2.getCurrentPrice()
            })
        });

        this.state.cc3.on('runSuccess', () => {
            this.setState({
                cc3Prices : cc3.getPrices(),
                cc3CurrentPrice : cc3.getCurrentPrice()
            })
        });
    }

    setModalShow = (bool) => {
        this.setState({
            modalShow : bool
        })
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

            console.log(this.state.finalData)

            if((cc === this.state.cc1Name && this.state.sellamount > this.state.finalData.cc1Amount) ||
               (cc === this.state.cc2Name && this.state.sellamount > this.state.finalData.cc2Amount) ||
               (cc === this.state.cc3Name && this.state.sellamount > this.state.finalData.cc3Amount)) {
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

    setTransferRecipient = (items) => {
        this.setState({
            transferRecipient : items[0]
        })
    }

    handleTransfer = (e) => {
        e.preventDefault()
        console.log(this.state.transferRecipient)
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
            if((this.state.transfercryptocurrency === this.state.cc1Name && this.state.transferamount > this.state.finalData.cc1Amount) ||
               (this.state.transfercryptocurrency === this.state.cc2Name && this.state.transferamount > this.state.finalData.cc2Amount) ||
               (this.state.transfercryptocurrency === this.state.cc3Name && this.state.transferamount > this.state.finalData.cc3Amount)) {
                this.setState({
                    transfercheck : true,
                    transfermessage : "Insufficient Cryptocurrency"
                })
            }
            else{
                let recipient = this.state.transferRecipient
                let amount = this.state.transferamount
                let cc = this.state.transfercryptocurrency
                recipient = findTrader(this.props.auth.uid,this.props.users,recipient)
                
                let info = {
                    transactionType : "transfer",
                    cryptocurrency : cc,
                    purchasedAmount : amount,
                    recipientid : recipient.id,
                    recipientemail : recipient.em,
                    senderemail: this.props.auth.email
                }
                this.props.transact(info)
                this.setState({
                    transfercheck : false,
                    transfermessage : "Transaction Complete"
                })
                document.getElementById("transfer").reset();
            }
        }
    }

    render() {
        let items = []
        const { auth, profile, transactions, users } = this.props;
        createData(auth, transactions).then((data) => {
            this.state.loaded = true
            this.state.finalData = data
        })

        if(this.state.loaded){
            items = userData(users, auth.uid)
        }

        if(!auth.uid || profile.account !== "trader" ) return <Redirect to="/"/>
        return (
            this.state.loaded ?
            <div> 
                <Navigationbar pass={() => this.setModalShow(true)} />
                <Upgrade show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
                <Container>
                    <Row>
                        <Col sm>
                            <Card>
                                <Card.Header>{this.state.cc1Name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Trend Graph</Card.Subtitle>
                                    <Sparklines data={this.state.cc1Prices} limit={9} height={100} width={300}>
                                        <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                                        <SparklinesSpots />
                                    </Sparklines>
                                    <hr/>
                                    <Card.Subtitle>Current Price</Card.Subtitle>
                                    <Card.Text>{this.state.cc1CurrentPrice}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card>
                                <Card.Header>{this.state.cc2Name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Trend Graph</Card.Subtitle>
                                    <Sparklines data={this.state.cc2Prices} limit={9} height={100} width={300}>
                                        <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                                        <SparklinesSpots />
                                    </Sparklines>
                                    <hr/>
                                    <Card.Subtitle>Current Price</Card.Subtitle>
                                    <Card.Text>{this.state.cc2CurrentPrice}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>  
                            <Card>
                                <Card.Header>{this.state.cc3Name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Trend Graph</Card.Subtitle>
                                    <Sparklines data={this.state.cc3Prices} limit={9} height={100} width={300}>
                                        <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                                        <SparklinesSpots />
                                    </Sparklines>
                                    <hr/>
                                    <Card.Subtitle>Current Price</Card.Subtitle>
                                    <Card.Text>{this.state.cc3CurrentPrice}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Card>
                                <Card.Header>Buy Cryptocurrency</Card.Header>
                                <Card.Body>
                                        <Form autocomplete="off" id="buy" onSubmit ={this.handleBuySubmit}>
                                            <Form.Group controlId="buycryptocurrency">
                                                <Form.Label>Cryptocurrencies</Form.Label>
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
                                            <Button variant="primary" type="submit">Purchase</Button>
                                            {this.state.buycheck  ? 
                                                <Alert variant="danger"><div><label>{this.state.buymessage}</label></div></Alert>:
                                                this.state.buymessage === "Transaction Complete" ?
                                                <Alert variant="success"><div><label>{this.state.buymessage}</label></div></Alert>:
                                                null
                                            }
                                        </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card>
                                <Card.Header>Sell Cryptocurrency</Card.Header>
                                <Card.Body>
                                        <Form autocomplete="off" id="sell" onSubmit ={this.handleSellSubmit}>
                                            <Form.Group controlId="sellcryptocurrency">
                                                <Form.Label>Cryptocurrencies</Form.Label>
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
                                            <Button variant="primary" type="submit">Sell</Button>
                                            {this.state.sellcheck  ? 
                                                <Alert variant="danger"><div><label>{this.state.sellmessage}</label></div></Alert>:
                                                this.state.sellmessage === "Transaction Complete" ?
                                                <Alert variant="success"><div><label>{this.state.sellmessage}</label></div></Alert>:
                                                null
                                            }   
                                            </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Card>
                            <Card.Header>Transfer Cryptocurrency</Card.Header>
                            <Card.Body>
                                <Form autocomplete="off" id="transfer" onSubmit={this.handleTransfer}> 
                                    <Form.Group>
                                        <Form.Label>Username of Recipient</Form.Label>
                                        <Search items={items}
                                            placeholder='Search Username of Recipient'
                                            maxSelected={1}
                                            multiple={true}
                                            autocomplete="off"
                                            onItemsChanged={this.setTransferRecipient.bind(this)} />
                                    </Form.Group>
                                    <Form.Group controlId="transfercryptocurrency">
                                        <Form.Label>Cryptocurrencies</Form.Label>
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
                                    <Button variant="primary" type="submit">Transfer</Button>
                                    {this.state.transfercheck  ? 
                                        <Alert variant="danger"><div><label>{this.state.transfermessage}</label></div></Alert>:
                                        this.state.transfermessage === "Transaction Complete" ?
                                        <Alert variant="success"><div><label>{this.state.transfermessage}</label></div></Alert>:
                                        null
                                    }   
                                </Form>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <br></br>
                <br></br>
            </div>:
            <Container>
            </Container>    
        )
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications,
        users : state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transact : (transaction) => dispatch(Transact(transaction))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "notifications", limit: 5, orderBy: ["time"]},
        {collection: "users"},
        {collection: "broadcasts", orderBy:["timestamp","desc"]}
    ])
)(Dashboard)