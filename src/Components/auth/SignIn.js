import React, { Component } from 'react';
import { Container, Form, Button, Card, Col, Row, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { signIn } from '../../Components/store/actions/authActions';
import { Redirect } from 'react-router-dom'
import '../../Styles/auth.css'

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render() {
        const { authError, auth , account } = this.props;
        if (auth.uid && account === "trader") return <Redirect to="/dashboard" />
        if (auth.uid && account === "analyst" ) return <Redirect to="/AnalystDashboard" />
        if (auth.uid && account === "administrator") return <Redirect to="/AdminDashboard" />
        return (
            <div >
                <Container>
                    <Card className="authcard cardsmobile">
                        <Card.Header as="h5">CryptoTrading &amp; Wallet</Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col sm>
                                        <h3>Sign In</h3>
                                        <Form autocomplete="off" id="signin" onSubmit ={this.handleSubmit}>
                                            <Form.Group controlId="email">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control required type="email" placeholder="Email" onChange={this.handleChange} />
                                                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control required type="password" placeholder="Password" onChange={this.handleChange} />
                                            </Form.Group>
                                            {authError ? <Alert variant="danger">{authError}</Alert> : null }
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                        <Button form="signin" className="mr-1" variant="success" type="submit">Sign In</Button>
                        <div id="right">
                            <span className="size mr-2">Don't Have An Account?</span>
                            <Link to="/register">
                                <Button variant="primary" >Register</Button>
                            </Link>
                        </div>
                        </Card.Footer>
                    </Card>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError : state.auth.authError,
        auth : state.firebase.auth,
        account : state.firebase.profile.account
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
