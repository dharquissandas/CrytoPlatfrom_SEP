import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'

export class CryptoLines extends Component {

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
            <Row>
            <Col sm>
                <Card>
                    <Card.Header as="h6">{this.state.cc1Name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Trend Graph</Card.Subtitle>
                        <Sparklines data={this.state.cc1Prices} limit={9} height={100} width={300}>
                            <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                            <SparklinesSpots />
                        </Sparklines>
                        <hr/>
                        <Card.Subtitle>Current Price</Card.Subtitle>
                        <Card.Text>£{this.state.cc1CurrentPrice.toFixed(2)}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm>
                <Card>
                    <Card.Header as="h6">{this.state.cc2Name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Trend Graph</Card.Subtitle>
                        <Sparklines data={this.state.cc2Prices} limit={9} height={100} width={300}>
                            <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                            <SparklinesSpots />
                        </Sparklines>
                        <hr/>
                        <Card.Subtitle>Current Price</Card.Subtitle>
                        <Card.Text>£{this.state.cc2CurrentPrice.toFixed(2)}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm>  
                <Card>
                    <Card.Header  as="h6">{this.state.cc3Name}</Card.Header>
                    <Card.Body>
                        <Card.Subtitle>Trend Graph</Card.Subtitle>
                        <Sparklines data={this.state.cc3Prices} limit={9} height={100} width={300}>
                            <SparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
                            <SparklinesSpots />
                        </Sparklines>
                        <hr/>
                        <Card.Subtitle>Current Price</Card.Subtitle>
                        <Card.Text>£{this.state.cc3CurrentPrice.toFixed(2)}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        )
    }
}

export default CryptoLines
