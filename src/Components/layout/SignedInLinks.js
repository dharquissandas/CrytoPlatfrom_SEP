import React from 'react'
import { Nav } from 'react-bootstrap'
import {connect} from 'react-redux'
import { signOut } from '../../Components/store/actions/authActions'
import { Popover, OverlayTrigger } from 'react-bootstrap'
import Broadcasts from '../dashboard/Broadcasts'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const SignedInLinks = (props) => {
    return (
        <div>
            <Nav>
                {props.profile.account === "trader" && !props.profile.premium &&
                <Nav.Link onClick={() => props.pass()} >Upgrade To Premium</Nav.Link>}
                {(props.profile.account === "trader" && props.profile.premium) &&
                <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                rootClose
                overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Title as="h3">{`Daily Broadcasts`}</Popover.Title>
                    <Popover.Content>
                        <Broadcasts broadcasts = {props.broadcasts} />
                    </Popover.Content>
                </Popover>
                }>
                    <Nav.Link>Broadcasts</Nav.Link>
                </OverlayTrigger>
                }

                {props.profile.account === "analyst" &&
                <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                rootClose
                overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Title as="h3">{`Daily Broadcasts`}</Popover.Title>
                    <Popover.Content>
                        <Broadcasts broadcasts = {props.broadcasts} />
                    </Popover.Content>
                </Popover>
                }>
                    <Nav.Link>Broadcasts</Nav.Link>
                </OverlayTrigger>
                }

                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                {props.profile.account === "trader" &&
                    <Nav.Link href="/wallet">Wallet</Nav.Link>
                }
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={props.signOut}>Logout</Nav.Link>
            </Nav>
        </div>
    )
}


const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        broadcasts : state.firestore.ordered.broadcasts,
        users : state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: (creds) => dispatch(signOut())
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
)(SignedInLinks)

