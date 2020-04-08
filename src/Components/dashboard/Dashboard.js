import React, { Component } from 'react';
import { Container, Tab, Nav, Jumbotron, Col, Row, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Transact } from '../store/actions/transactionActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'

import { createData } from '../utils/WalletUtiils'
import OverviewAlert from './dashboardComponents/OverviewAlert';

import '../../App.css'
import Navigationbar from '../layout/Navigationbar';
import Upgrade from '../auth/Upgrade';
import Buy from './dashboardComponents/Buy'
import Sell from './dashboardComponents/Sell'
import Transfer from './dashboardComponents/Transfer'
import Overview from './dashboardComponents/Overview'


export class Dashboard extends Component {
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
        finalData : {},
        loaded : false,
        modalShow : false,
        transfercheck: false,
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


    setTransferRecipient = (items) => {
        this.setState({
            transferRecipient : items[0]
        })
    }


    accountType = (n,p) => {
        if(p){return "Premium Trader"}
        else if(n==="trader"){ return "Trader"}
        else if(n==="analyst"){ return "Analyst" }
        else{ return "Administrator" }
    }

    reinitData = () => {
        let {auth, transactions, profile} = this.props;
        createData(auth, transactions).then((data) => {
            this.setState({
                finaldata : data
            })
        })
    }

    render() {
        const { auth, profile, transactions, users } = this.props;

        createData(auth, transactions).then((data) => {
            this.state.loaded = true
            this.state.finalData = data
        })
        if(profile.isLoaded){
            if(!auth.uid || profile.account !== "trader" ){return(<Redirect to="/"/>)}
        }
        return (
            this.state.loaded && profile.isLoaded ?
            <div>
                <Navigationbar pass={() => this.setModalShow(true)} />
                <Upgrade show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
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
                                    <Nav.Link eventKey="second">Buy Cryptocurrency</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Sell Cryptocurrency</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Transfer Cryptocurrency</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9} className="mobilealign">
                            <div>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <OverviewAlert profile = {profile} finalData= {this.state.finalData} />
                                    <Overview  profile = {profile} finalData= {this.state.finalData} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <OverviewAlert detailed profile = {profile} finalData= {this.state.finalData} />
                                    <Buy profile = {profile}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <OverviewAlert detailed profile = {profile} finalData= {this.state.finalData} />
                                    <Sell profile = {profile} finalData= {this.state.finalData} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <OverviewAlert detailed profile = {profile} finalData= {this.state.finalData} />
                                    <Transfer reinitData = {this.reinitData} profile = {profile} finalData= {this.state.finalData} />
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