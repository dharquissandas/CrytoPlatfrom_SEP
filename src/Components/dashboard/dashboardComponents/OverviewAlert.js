import React, { Component } from 'react'
import { Alert, Col, Row, Button } from 'react-bootstrap' 
import { cc1 } from '../../cryptocurrencies/cc1'
import { cc2 } from '../../cryptocurrencies/cc2'
import { cc3 } from '../../cryptocurrencies/cc3'
import { Link } from 'react-router-dom'

export class OverviewAlert extends Component {
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
        cc3CurrentPrice : cc3.getCurrentPrice(),
    }

    render() {
        let profile = this.props.profile
        let finalData = this.props.finalData
        return (
            this.props.detailed ? 
            <div>
                <Alert variant="dark">
                    <Alert.Heading as="h5">At A Glance</Alert.Heading>
                        <p>Fiat Amount : £{parseFloat(profile.fiatAmount).toFixed(2)}</p>
                        {profile.fiatAmount === "0" && window.location.pathname !== "/wallet" && 
                        <div>
                        <p>You don't have any fiat currency to buy cryptocurrency</p>
                        <Link to="/wallet">
                            <Button varient="success">Add to Fiat Wallet</Button>
                        </Link>
                        </div>
                        }
                        <hr/>
                        <Row>
                            <Col sm>
                                <p> Current {this.state.cc1Name} Price : £{this.state.cc1CurrentPrice.toFixed(2)}</p>
                                <p> Current {this.state.cc1Name} Amount : {finalData.cc1Amount}</p>
                            </Col>
                            <Col sm>
                                <p> Current {this.state.cc2Name} Price : £{this.state.cc2CurrentPrice.toFixed(2)}</p>
                                <p> Current {this.state.cc2Name} Amount : {finalData.cc2Amount}</p>
                            </Col>
                            <Col sm>
                                <p> Current {this.state.cc3Name} Price : £{this.state.cc3CurrentPrice.toFixed(2)}</p>
                                <p> Current {this.state.cc3Name} Amount : {finalData.cc3Amount}</p>
                            </Col>
                        </Row>
                </Alert>
            </div> :
            <div>
            <Alert variant="dark">
                <Alert.Heading as="h5">At A Glance</Alert.Heading>
                    <p>Fiat Amount : £{parseFloat(profile.fiatAmount).toFixed(2)}</p>
                    {profile.fiatAmount === "0" && 
                    <div>
                    <p>You don't have any fiat currency to buy cryptocurrency</p>
                    <Link to="/wallet">
                        <Button varient="success">Add to Fiat Wallet</Button>
                    </Link>
                    </div>
                    }
                    <hr/>
                    <Row>
                        <Col sm>
                            <p> Current {this.state.cc1Name} Amount : {finalData.cc1Amount}</p>
                        </Col>
                        <Col sm>
                            <p> Current {this.state.cc2Name} Amount : {finalData.cc2Amount}</p>
                        </Col>
                        <Col sm>
                            <p> Current {this.state.cc3Name} Amount : {finalData.cc3Amount}</p>
                        </Col>
                    </Row>
            </Alert>
            </div>
        ) 
    }
}

export default OverviewAlert
