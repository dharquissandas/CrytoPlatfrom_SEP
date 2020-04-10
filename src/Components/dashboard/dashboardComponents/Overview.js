import React, { Component } from 'react'
import CryptoLines from './CryptoLines'
import {Card, ListGroup, Row, Col} from 'react-bootstrap'
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'

export class Overview extends Component {
    state = {
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

    render() {
        return (
            <div>
                <CryptoLines />
                <br />
                <Row>
                    <Col sm>
                        <Card>
                            <Card.Header>Recent Prices - {this.state.cc1Name}</Card.Header>
                            <ListGroup variant="flush">
                                {this.state.cc1Prices.map(item => {
                                    return(
                                        <ListGroup.Item>£{item.toFixed(2)}</ListGroup.Item>
                                    )
                                }).reverse()}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card>
                            <Card.Header>Recent Prices - {this.state.cc2Name}</Card.Header>
                            <ListGroup variant="flush">
                                {this.state.cc2Prices.map(item => {
                                    return(
                                        <ListGroup.Item>£{item.toFixed(2)}</ListGroup.Item>
                                    )
                                }).reverse()}
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col sm>
                        <Card>
                            <Card.Header>Recent Prices - {this.state.cc3Name}</Card.Header>
                            <ListGroup variant="flush">
                                {this.state.cc3Prices.map(item => {
                                    return(
                                        <ListGroup.Item>£{item.toFixed(2)}</ListGroup.Item>
                                    )
                                }).reverse()}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Overview
