import React, { Component } from 'react';
import { Tab, Nav, Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import { Broadcast, Message, Close } from "../store/actions/analystActions";
import { findNCheckedMessages } from '../utils/DashboardUtils'
import Navigationbar from '../layout/Navigationbar';
import { createData } from '../utils/WalletUtiils'
import Overview from './dashboardComponents/Overview'
import BroadcastMessage from './dashboardComponents/BroadcastMessage';
import SearchTransactions from './dashboardComponents/SearchTransactions'
import TraderMessages from './dashboardComponents/TraderMessages'


export class AnalystDashboard extends Component {
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
        const { auth, profile, transactions, messages } = this.props;

        createData(auth, transactions).then((data) => {
            this.state.loaded = true
            this.state.finalData = data
        })

        if(!auth.uid || profile.account !== "analyst") return <Redirect to="/"/>
        return (
            this.state.loaded && messages ?
            <div>
            <Navigationbar place="dashboard" />
            <br></br>
            <Tab.Container unmountOnExit defaultActiveKey="first">
                <Row style={{marginRight : "0px"}}>
                    <Col sm={3}>
                        <Nav variant="pills" className="ml-1 flex-column">
                            <Nav.Item>
                                <Nav.Link className="navitems" eventKey="first">Overview</Nav.Link>
                            </Nav.Item>
                            <br />
                            <Nav.Item>
                                <Nav.Link className="navitems" eventKey="second">Broadcast Message</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link className="navitems" style={{display:"flex"}} eventKey="third"><div className="mr-auto">Trader Messages</div>  <div> Unread: {findNCheckedMessages(this.props.messages).length}</div></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="navitems" eventKey="fourth">Search Transactions</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} className="mobilealign">
                        <div>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Overview  profile = {profile} finalData= {this.state.finalData} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <BroadcastMessage broadcast = {this.props.broadcast} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <TraderMessages messages = {this.props.messages} 
                                                close={this.props.close} 
                                                message = {this.props.message} 
                                                users = {this.props.users} 
                                                auth={this.props.auth} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <SearchTransactions transactions = {transactions} />
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
        messages : state.firestore.ordered.messages,
        users : state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        broadcast : (broadcast) => dispatch(Broadcast(broadcast)),
        message : (oldmessages, message) => dispatch(Message(oldmessages, message)),
        close : (id) => dispatch(Close(id))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},        
        {collection: "messages"},
        {collection: "users"},
    ])
)(AnalystDashboard)

