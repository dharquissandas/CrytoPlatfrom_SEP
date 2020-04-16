import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navigationbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks place={props.place} profile={props.profile} pass = {props.pass} /> : < SignedOutLinks />
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">CryptoTrading &amp; Wallet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {links}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navigationbar)
