import React, { Component } from 'react'
import { Alert, Card, Form, Button } from 'react-bootstrap'
import { idSearch, idMessageSearch } from '../../utils/DashboardUtils'
import moment from 'moment'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
 
export class MessageList extends Component {
    state = {
        message : "",
        currentMessages : [],
        allMessages : idMessageSearch(this.props.allMessages, this.props.senderId)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let a = {
            inituserId : this.props.senderId,
            senderId : this.props.auth.uid,
            message : this.state.message,
            timestamp : new Date()
        }

        this.props.message(this.props.messages,a);
    }

    render() {
        this.state.allMessages = idMessageSearch(this.props.allMessages, this.props.senderId)
        return (
            <div>
                {!this.state.allMessages || this.state.allMessages.length === 0 ?
                null 
                :
                <div>
                <Alert variant="dark">Messages</Alert>
                <Card>
                    <Card.Header as="h6">Reply</Card.Header>
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
                <br></br>
                {this.state.allMessages !== null && this.state.allMessages.slice(0,10).map(item => {
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        allMessages : state.firestore.ordered.messages,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "messages"},
    ])
)(MessageList)

