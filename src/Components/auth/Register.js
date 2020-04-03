import React, { Component } from 'react';
import { Container, Form, Button, Card, Col, Row, Alert} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {otherSignUp, traderSignUp} from '../store/actions/authActions'
import {Link} from 'react-router-dom'
import '../../Styles/auth.css'



class Register extends Component {
    state = {
        account: "",
        email: "",
        username: "",
        bankAccountNumber: "",
        sortCode: "", 
        password: "",
        firstname: "",
        lastname: "",
        analystCertification: "",
        adminAccessCode: "",
        checkresult: "",
        idProof: "",
        issue: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let account = this.state.account
        let adminAccessCode = this.state.adminAccessCode
        let analystCertification = this.state.analystCertification

        e.preventDefault();

        if(account === "administrator" && adminAccessCode !== "12345"){
            this.setState({
                checkresult : "Admin Access Code Incorrect",
                issue : true
            })
        }
        else if (account === "analyst" && analystCertification !== "Certified"){
            this.setState({
                checkresult : "Certification Not Valid",
                issue : true
            })
        }
        else{
            if(account === "trader"){
                this.props.traderSignUp(this.state)
            }
            else{
                this.props.otherSignUp(this.state)
            }
        }

    }

    handleAccountChoice = (e) => {
        this.setState({
          account: e.target.value
        });
      };
      

    render() {
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to="/dashboard" />
        return (
            <div>
                <Container>
                    <Card className="authcard">
                    <Card.Header as="h5">CryptoTrading &amp; Wallet</Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <h3>Register</h3>
                                        <Form autocomplete="off" id="register" onSubmit ={this.handleSubmit}>
                                        <fieldset>
                                                <Form.Group as={Row}>
                                                <Form.Label as="legend" column sm={2}>
                                                    Account Type
                                                </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Check
                                                        required
                                                        type="radio"
                                                        label="Trader"
                                                        name="select"
                                                        onChange= {this.handleAccountChoice}
                                                        id="trader"
                                                        value="trader"
                                                        />
                                                        <Form.Check
                                                        required
                                                        type="radio"
                                                        label="Analyst"
                                                        name="select"
                                                        onChange= {this.handleAccountChoice}
                                                        id="analyst"
                                                        value="analyst"
                                                        />
                                                        <Form.Check
                                                        required
                                                        type="radio"
                                                        label="Administrator"
                                                        name="select"
                                                        onChange= {this.handleAccountChoice}
                                                        id="administator"
                                                        value="administrator"
                                                        />                                                        
                                                    </Col>
                                                </Form.Group>
                                        </fieldset>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="firstname">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" placeholder="First Name" onChange={this.handleChange} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="lastname">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Last Name" onChange={this.handleChange} />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="username">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text" placeholder="Username" onChange={this.handleChange} />
                                                </Form.Group>
                                                
                                            <Form.Group as={Col} controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Email" onChange={this.handleChange} />
                                            </Form.Group>
                                            </Form.Row>

                                            <Form.Group controlId="idProof">
                                                <Form.Label>Proof of ID</Form.Label>
                                                <Form.Control type="text" placeholder="Passport or Driving License Identification Number" onChange={this.handleChange} />
                                            </Form.Group>

                                            {this.state.account === "trader" &&
                                                <Form.Row>
                                                    <Form.Group as={Col} controlId="bankAccountNumber">
                                                    <Form.Label>Bank Number</Form.Label>
                                                    <Form.Control type="text" maxLength="8" required placeholder="Bank Account Number" onChange={this.handleChange} />
                                                    </Form.Group>

                                                    <Form.Group as={Col} controlId="sortCode">
                                                    <Form.Label>Sort Code</Form.Label>
                                                    <Form.Control type="text" maxLength="6" required placeholder="Sort Code" onChange={this.handleChange} />
                                                    </Form.Group>
                                                </Form.Row>
                                            }

                                            {this.state.account === "administrator" &&
                                                <Form.Group controlId="adminAccessCode">
                                                    <Form.Label>Administrator Access Code</Form.Label>
                                                    <Form.Control type="text" placeholder="Administrator Access Code" onChange={this.handleChange} />
                                                </Form.Group>                                            
                                            }

                                            {this.state.account === "analyst" &&
                                                <Form.Group controlId="analystCertification">
                                                    <Form.Label>Analyst Certification</Form.Label>
                                                    <Form.Control type="text" placeholder="Analyst Certification" onChange={this.handleChange} />
                                                </Form.Group>                                            
                                            }

                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password"  onChange={this.handleChange} />
                                            </Form.Group>                               
                                            <div>
                                                {authError ? <Alert variant="danger">{authError}</Alert> : null}
                                                {this.state.issue ? <Alert variant="danger">{this.state.checkresult}</Alert> : null}
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" form="register" type="submit">Register</Button>
                            <div id="right">
                                <span>Already Have An Account?</span>
                                <Link to="/">
                                    <Button className="ml-2" type="submit">Sign In</Button>
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
    return {
        auth : state.firebase.auth,
        authError : state.auth.authError
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        traderSignUp: (newUser) => dispatch(traderSignUp(newUser)),
        otherSignUp: (newUser) => dispatch(otherSignUp(newUser))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)
