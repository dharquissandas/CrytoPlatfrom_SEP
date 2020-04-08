import React, { Component } from 'react';
import { Container, Nav, Jumbotron, Button, Alert, Col, Row, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Upgrade from './Upgrade'
import Navigationbar from '../layout/Navigationbar';
import AccountInformation from './profile/AccountInformation';
import PaymentInformation from './profile/PaymentInformation';
import SecurityInformation from './profile/SecurityInformation';


export class Profile extends Component {
    state = {
        modalShow : false
    }

    setModalShow = (bool) => {
        this.setState({
            modalShow : bool
        })
    }

    render() {
        const { auth, profile } = this.props;
        if(!auth.uid) return <Redirect to="/"/>
        return (
            profile.isLoaded ?
            <div>
                <Navigationbar pass={() => this.setModalShow(true)} />
                {profile.account != "analyst" &&
                    <Upgrade show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
                }
                <br></br>
                <Tab.Container unmountOnExit defaultActiveKey="first">
                    <Row style={{marginRight : "0px"}}>
                        <Col sm={3}>
                        <Nav variant="pills" className="ml-1 flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Account Information</Nav.Link>
                            </Nav.Item>
                            {profile.account !== "analyst" &&
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Payment Card Information</Nav.Link>
                                </Nav.Item>
                            }
                            <Nav.Item>
                                <Nav.Link eventKey="third">Security Information</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9} className="mobilealign">
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AccountInformation profile = {this.props.profile}/>
                            </Tab.Pane>
                            {profile.account !== "analyst" &&
                                <Tab.Pane eventKey="second">
                                    <PaymentInformation profile={this.props.profile} />
                                </Tab.Pane>
                            }   
                            <Tab.Pane eventKey="third">
                                <SecurityInformation profile={this.props.profile} />
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>:
            null
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

