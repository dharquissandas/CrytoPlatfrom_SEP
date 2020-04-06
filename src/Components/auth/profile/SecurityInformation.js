import React, { Component } from 'react'
import { Alert, Form, Jumbotron, Button, Card, Col, Row, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import { idUpdate } from '../../store/actions/authActions'

export class SecurityInformation extends Component {
    state = {
        oldidProof : "",
        idProof : "",
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
        if(this.state.oldidProof !== this.props.profile.idProof){
            console.log("there")
            this.setState({
                check : false,
                message : "Invalid Credentials"
            })
        }
        else{
            console.log("here")
            this.props.idUpdate(this.state.idProof)
            this.setState({
                check : true,
                message : "Successfully Updated"
            })
        }   
    }

    render() {
        const {profile} = this.props;
        const info  = "XXXXXX" + profile.idProof.charAt(6) + profile.idProof.charAt(7) + profile.idProof.charAt(8)
        return (
            <div>
                <Card>
                    <Card.Header as="h5">Security Information</Card.Header>
                    <Card.Body>
                        <Alert variant="dark">
                            Previous Passport Identification Number : {info}
                        </Alert>
                        <Form autocomplete="off" id="id" onSubmit ={this.handleSubmit}>
                            <Form.Group controlId="oldidProof">
                                <Form.Label>Previous Proof of ID</Form.Label>
                                <Form.Control type="text" maxLength="9" minLength="9" placeholder="Previous Passport Identification Number" onChange={this.handleChange} />
                            </Form.Group>
                                
                            <Form.Group controlId="idProof">
                                <Form.Label>Proof of ID</Form.Label>
                                <Form.Control type="text" maxLength="9" minLength="9" placeholder="Passport Identification Number" onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                        {this.state.check  ? 
                            <Alert variant="success"><div><label>{this.state.message}</label></div></Alert>:
                            this.state.message === "Successfully Updated" ?
                            <Alert variant="danger"><div><label>{this.state.message}</label></div></Alert>:
                            null
                        }
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" form="id" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        idUpdate : (id) => dispatch(idUpdate(id))
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

export default connect(mapStateToProps, mapDispatchToProps)(SecurityInformation)

