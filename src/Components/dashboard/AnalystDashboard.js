import React, { Component } from 'react';
import { Container, Form, Button, Card, Col, Row, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { Broadcast } from "../store/actions/analystActions";
import Navigationbar from '../layout/Navigationbar';

export class Dashboard extends Component {
    state = {
        cc1 : cc1.getCC1(),
        cc1Prices : cc1.getPrices(),
        cc1CurrentPrice : cc1.getCurrentPrice(),
        cc2 : cc2.getCC2(),
        cc2Prices : cc2.getPrices(),
        cc2CurrentPrice : cc2.getCurrentPrice(),
        cc3 : cc3.getCC3(),
        cc3Prices : cc3.getPrices(),
        cc3CurrentPrice : cc3.getCurrentPrice(),
        broadcastMessage : "",
        broadcastTitle : "",
        check : false,
        checkmessage : ""
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.broadcastTitle, this.state.broadcastMessage)
        let broadcast = {
            broadcastTitle : this.state.broadcastTitle,
            broadcastMessage : this.state.broadcastMessage
        }
        this.props.broadcast(broadcast)
        this.setState({
            check : true,
            message : "Broadcast Sucessful"
        })
    }



    render() {
        const { auth, account } = this.props;
        if(!auth.uid || account !== "analyst") return <Redirect to="/"/>
        return (
            <div>
                <Navigationbar />
                <Container>
                    <Row>
                        <Col sm>
                            <Card>
                                <Card.Header>Cryptocurrency 1</Card.Header>
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
                                <Card.Header>Cryptocurrency 2</Card.Header>
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
                                <Card.Header>Cryptocurrency 3</Card.Header>
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
                        <Col>
                            <Card>
                                <Card.Header>Broadcast Message</Card.Header>
                                <Card.Body>
                                    <Form autocomplete="off" id="broadcast" onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="broadcastTitle">
                                            <Form.Label>Broadcast Title</Form.Label>
                                            <Form.Control required type="text" placeholder="Title" onChange={this.handleChange} />
                                        </Form.Group>
                                        <Form.Group controlId="broadcastMessage">
                                            <Form.Label>Broadcast Content</Form.Label>
                                            <Form.Control required as="textarea" rows="3" placeholder="Content" onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form>
                                    {this.state.check ? <Alert variant="success">{this.state.message}</Alert> : null }
                                </Card.Body>
                                <Card.Footer>
                                    <Button type="submit" form="broadcast" variant="success">Broadcast</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        account : state.firebase.profile.account,
        notifications : state.firestore.ordered.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        broadcast : (broadcast) => dispatch(Broadcast(broadcast))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "notifications", limit: 5, orderBy: ["time"]}
    ])
)(Dashboard)

