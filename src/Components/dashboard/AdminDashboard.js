import React, { Component } from 'react';
import { Container, Form, Button, Card, Col, Row} from 'react-bootstrap';
import TransactionList from './TransactionList';
import { connect } from 'react-redux';
import { Transact } from '../store/actions/transactionActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom' 

//import {Notifications} from './Notifications'

export class Dashboard extends Component {
    state = {
        transactionType : "buy",
        cryptocurrency : "",
        amount: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.transact(this.state)
    }

    render() {
        const { transactions, auth, account } = this.props;
        if(!auth.uid || account !== "administrator") return <Redirect to="/"/>
        return (
            <div>
                <Container>
                    <Row>
                        <Card>
                            <Card.Body>
                                <Container>
                                    <Col>
                                        <h2>Admin Dashboard</h2>
                                        <Form autocomplete="off" onSubmit ={this.handleSubmit}>
                                            <Form.Group controlId="cryptocurrency">
                                                <Form.Label>Cryptocurrency Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Cryptocurrency" onChange={this.handleChange} />
                                            </Form.Group>
                                            <Form.Group controlId="amount">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control type="text" placeholder="Amount" onChange={this.handleChange} />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">Purchase</Button>
                                        </Form>
                                    </Col>
                                </Container>
                            </Card.Body>
                        </Card>
                        <Col>
                            {/* <Notifications notifications = {notifications} /> */}
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <TransactionList transactions={transactions}/>
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
        transact : (transaction) => dispatch(Transact(transaction))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "notifications", limit: 5, orderBy: ["time"]}
    ])
)(Dashboard)

