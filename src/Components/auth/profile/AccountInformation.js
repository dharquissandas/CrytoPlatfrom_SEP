import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Alert, Form, Jumbotron, Button, Card, Col, Row, Tab} from 'react-bootstrap';
import { accountUpdate, upgrade } from '../../store/actions/authActions'

export class AccountInformation extends Component {
    state = {
        firstname : this.props.profile.firstname,
        lastname : this.props.profile.lastname,
        username : this.props.profile.username,
        check : false,
        message : ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
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

    unsub = (e) => {
        e.preventDefault()
        this.props.upgrade(false)
    }


    render() {
        return ( 
            <div>
                <Card>
                    <Card.Header as="h5">Account Information</Card.Header>
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
                    {this.state.check ? <Alert variant="success">{this.state.message}</Alert> : null}
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="success" form="updateinfo" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
                {this.props.profile.premium && 
                <Card className="mt-1">
                    <Card.Header as="h5">Unsubscribe From Premium</Card.Header>
                    <Card.Body>
                        <p>Unsubscribing from premium will mean that you will lose broadcast and messaging ability from the helpful analysts.</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="danger" form="updateinfo" type="submit" onClick= {this.unsub}>Unsubscribe</Button>
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
