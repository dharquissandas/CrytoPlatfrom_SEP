import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert, Form, Button, Card, Col } from 'react-bootstrap';
import { accountUpdate, upgrade } from '../../store/actions/authActions'

export class AccountInformation extends Component {
    state = {
        firstname : this.props.profile.firstname,
        lastname : this.props.profile.lastname,
        username : this.props.profile.username,
        check : false,
        message : ""
    }

    accountType = (n,p) => {
        if(p){return "Premium Trader"}
        else if(n==="trader"){ return "Trader"}
        else if(n==="analyst"){ return "Analyst" }
        else{ return "Administrator" }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (!/\S/.test(this.state.firstname) || !/\S/.test(this.state.lastname) || !/\S/.test(this.state.username)) {
            this.setState({
                check : true,
                message : "Data Invalid",
                firstname : this.props.profile.firstname,
                lastname : this.props.profile.lastname,
                username : this.props.profile.username,
            })
        }
        else{
            let u = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                username : this.state.username
            }
            this.props.accountUpdate(u)
    
            this.setState({
                check : true,
                message : "Successfully Updated"
            })
        }
    }

    unsub = (e) => {
        e.preventDefault()
        this.props.upgrade(false)
    }


    render() {
        let profile = this.props.profile
        let auth = this.props.auth
        return ( 
            <div>
                <Card bg="dark" text="white" border="info" >
                    <Card.Header as="h6">At A Glance</Card.Header>
                    <Card.Body style={{padding:"0.8em", paddingLeft:"1.25rem"}}>
                    {profile.firstname} {profile.lastname} - {this.accountType(profile.account,profile.premium)} <br></br>
                    {auth.email}
                    </Card.Body>
                </Card>
                <br></br>
                <Card bg="dark" text="white" border="info">
                    <Card.Header as="h6">Account Information</Card.Header>
                    <Card.Body>
                        <Form autoComplete="off" id="updateinfo" onSubmit ={this.handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" required value={this.state.firstname} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" required value={this.state.lastname} onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" required value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    {this.state.check ? 
                        this.state.message === "Successfully Updated" ?
                    <Alert variant="success">{this.state.message}</Alert>:
                    <Alert variant="danger">{this.state.message}</Alert>
                    : null}
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="info" form="updateinfo" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
                {this.props.profile.premium && 
                <Card  bg="dark" text="white" border="info" className="mt-3">
                    <Card.Header as="h6">Unsubscribe From Premium</Card.Header>
                    <Card.Body>
                        <p>Unsubscribing from premium will mean that you will lose broadcast and messaging ability from the helpful analysts.</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="info" form="updateinfo" type="submit" onClick= {this.unsub}>Unsubscribe</Button>
                    </Card.Footer>
                </Card>                
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        accountUpdate : (user) => dispatch(accountUpdate(user)),
        upgrade : (bool) => dispatch(upgrade(bool))
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        emailError : state.auth.emailError,
        notifications : state.firestore.ordered.notifications,
        users : state.firestore.ordered.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation)
