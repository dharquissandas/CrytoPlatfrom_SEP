import React, { Component } from 'react';
import { Container, Nav, Jumbotron, Button, Card, Col, Row, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Navigationbar from '../layout/Navigationbar';
import AccountInformation from './profile/AccountInformation';
import PaymentInformation from './profile/PaymentInformation';
import SecurityInformation from './profile/SecurityInformation';
import GeneralSettings from './profile/GeneralSettings';


export class Profile extends Component {
    state = {

    }

    componentDidMount = () => {

    }

    accountType = (n,p) => {
        if(p){return "Premium Trader"}
        else if(n==="trader"){ return "Trader"}
        else if(n==="analyst"){ return "Analyst" }
        else{ return "Administrator" }
    }

    render() {
        const { auth, profile } = this.props;
        if(!auth.uid) return <Redirect to="/"/>
        return (
            <div>
                <Navigationbar />
                <Jumbotron style={{ marginBottom : "1em", 
                                    paddingBottom: "1em",
                                    paddingTop: "1em",
                                }} fluid>
                    <Container>
                        <h1>Profile</h1>
                        <h5>{profile.firstname} {profile.lastname} - {this.accountType(profile.account,profile.premium)} </h5>
                        <h5>{profile.em}</h5>
                    </Container>
                </Jumbotron>

                <Tab.Container defaultActiveKey="first">
                    <Row style={{marginRight : "0px"}}>
                        <Col sm={3}>
                        <Nav variant="pills" className="ml-1 flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Account Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Payment Card Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Security Information</Nav.Link>
                            </Nav.Item>
                            <hr></hr>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">General Settings</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AccountInformation />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <PaymentInformation />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <SecurityInformation />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <GeneralSettings />
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps,null),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "notifications", limit: 5, orderBy: ["time"]}
    ])
)(Profile)

