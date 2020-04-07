import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navigationbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks profile={props.profile} pass = {props.pass} /> : < SignedOutLinks />
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="/">CryptoTrading &amp; Wallet</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                {links}
            </Navbar>
            <br />
            <br />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navigationbar)
