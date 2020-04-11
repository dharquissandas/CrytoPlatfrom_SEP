import React, { Component } from 'react'
import { Alert, Card, Row, Col, Form, Button } from 'react-bootstrap'
import { idSearch, idMessageSearch } from '../../utils/DashboardUtils'
import moment from 'moment'

export class Messaging extends Component {
    state = {
        message : "",
        senderId : this.props.auth.uid,
        userMessages : idMessageSearch(this.props.messages, this.props.auth.uid)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let a = {
            inituserId : this.props.auth.uid,
            senderId : this.props.auth.uid,
            message : this.state.message,
            timestamp : new Date()
        }
        let userm = idMessageSearch(this.props.messages, this.props.auth.uid)
        this.props.message(userm,a)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        this.state.userMessages = idMessageSearch(this.props.messages, this.state.senderId)
        console.log(this.state.userMessages)
        return (
            <div>
                <Row>
                    <Col sm>
                        <Card>
                            <Card.Header as="h6">Message An Analyst</Card.Header>
                            <Card.Body>
                                <Form id="messageform" onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="message">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control required placeholder="Message" as="textarea" rows="3" onChange={this.handleChange} />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="success" type="submit" form="messageform">Send</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm>
                        {!this.state.userMessages || this.state.userMessages.length === 0 ?
                            <Alert variant="dark">No Messages</Alert> 
                            :
                            <div>
                            <Alert variant="dark">Messages</Alert>
                            {this.state.userMessages !== null && this.state.userMessages.slice(0,10).map(item => {
                                return(
                                <Card className="notif">
                                    <Card.Header className="notifHeader">
                                    <strong className="mr-auto">
                                        {
                                            idSearch(item.senderId, this.props.users).id === this.props.auth.uid ? 
                                            "You"
                                            :
                                            idSearch(item.senderId, this.props.users).firstname + " " + idSearch(item.senderId, this.props.users).lastname
                                        }
                                    </strong>
                                    <small>{moment(item.timestamp.toDate()).calendar()}</small>
                                    </Card.Header>
                                    <Card.Body className="notifBody">
                                    <p>{item.message}</p>
                                    </Card.Body>
                                </Card>
                            )})}
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}


export default Messaging

