import React, { Component } from 'react';
import { Tab, Nav, Button, Card, Col, Row, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import { deleteBroadcast } from "../store/actions/analystActions";
import Navigationbar from '../layout/Navigationbar';
import { createData } from '../utils/WalletUtiils'
import Overview from './dashboardComponents/Overview'
import SearchTransactions from './dashboardComponents/SearchTransactions'
import SearchBroadcast from './dashboardComponents/SearchBroadcast'
import SearchUsers from './dashboardComponents/SearchUsers'



export class AdminDashboard extends Component {
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
        loaded : false,
        finalData : {}
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

    render() {
        const { auth, profile, transactions } = this.props;

        createData(auth, transactions).then((data) => {
            this.state.loaded = true
            this.state.finalData = data
        })

        if(!auth.uid || profile.account !== "administrator") return <Redirect to="/"/>
        return (
            this.state.loaded ?
            <div>
            <Navigationbar />
            <br></br>
            <Tab.Container unmountOnExit defaultActiveKey="first">
                <Row style={{marginRight : "0px"}}>
                    <Col sm={3}>
                        <Nav variant="pills" className="ml-1 flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Overview</Nav.Link>
                            </Nav.Item>
                            <br />
                            <Nav.Item>
                                <Nav.Link eventKey="second">Transactions</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Broadcasts</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Users</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className="mobilealign">
                        <div>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Overview profile = {profile} finalData= {this.state.finalData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <SearchTransactions admin transactions = {transactions} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <SearchBroadcast deleteBroadcast = {this.props.deleteBroadcast} broadcasts = {this.props.broadcasts} users ={this.props.users} auth ={this.props.auth} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <SearchUsers users = {this.props.users} auth ={this.props.auth} />
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                    </Col>
                </Row>
            </Tab.Container>
            <br />
        </div>:
        <div></div>            
        )
    }
}
const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        users : state.firestore.ordered.users,
        broadcasts : state.firestore.ordered.broadcasts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBroadcast : (broadcast) => dispatch(deleteBroadcast(broadcast))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "broadcasts" },
    ])
)(AdminDashboard)

