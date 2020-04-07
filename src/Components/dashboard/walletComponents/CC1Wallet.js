import React, { Component } from 'react'
import {Card, Alert, Button, Row, Col } from 'react-bootstrap'
import {cc1} from '../../cryptocurrencies/cc1'
import moment from 'moment'

export class cc1Wallet extends Component {

    renderText= (event) => {
        if(event === "buy"){ return "Buy" }
        else if(event === "sell"){ return "Sell"}
        else{ return "Transfer"}
    }

    handleClick = () => {
        let data = this.props.finalData
        this.props.exportModal(true, data.cc1Transactions)
    }

    render() {
        let data = this.props.finalData
        return (
            <Row>
                <Col sm>
                <Card className="mb-3">
                    <Card.Header as="h6">
                        {cc1.getName()}
                    </Card.Header> 
                    <Card.Body>
                        <Card.Subtitle>Current Amount:</Card.Subtitle>
                        <Card.Text>{data.cc1Amount}</Card.Text>
                        <hr/>
                        <Card.Subtitle>Current Price:</Card.Subtitle>
                        <Card.Text>£{cc1.getCurrentPrice().toFixed(2)}</Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header as="h6">
                        Export
                    </Card.Header> 
                    <Card.Body>
                        <Card.Text>This will create a file that is downloaded for safe keeping and the subsequent wallet will be removed from our system.</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" onClick= {this.handleClick}>Export</Button>
                    </Card.Footer>
                </Card>
                </Col>
                <Col sm>
                    <Alert variant="secondary"><h6>Wallet History - Last 10 Transactions</h6></Alert>
                    {data.cc1Transactions && data.cc1Transactions.slice(0,10).map(item => {
                        return(
                            <Card className="notif" variant="dark" key={item.id}>
                                <Card.Header className="notifHeader">
                                <strong  className="mr-auto">{this.renderText(item.transactionType)}</strong>
                                <small>{moment(item.timestamp.toDate()).calendar()}</small>
                                </Card.Header>
                                <Card.Body className="notifBody">
                                <p>Amount: {item.purchasedAmount}</p>
                                {item.transactionType === "transfer" ? 
                                <p>Recipent: {item.recipientemail} </p> :
                                <p>Purchase Price: £{item.purchasePrice.toFixed(2)} </p>
                                }
                                </Card.Body>
                            </Card>
                        )
                    }).reverse() }         
                </Col>
            </Row>
        )
    }
}

export default cc1Wallet