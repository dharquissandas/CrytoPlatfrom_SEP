import React, { Component } from 'react'
import { Alert, Card, Row, Col, Button } from 'react-bootstrap'
import { idSearch, idMessageSearch, findNCheckedMessages } from '../../utils/DashboardUtils'
import MessageList from './MessageList'
import moment from 'moment'

export class TraderMessages extends Component {
    state = {
        selectedUserId : "",
        selectedUserMessages : "",
        nCheckedMessages : findNCheckedMessages(this.props.messages)
    }

    handleReply = (senderId) => {
        this.setState({
            selectedUserId : senderId,
            selectedUserMessages : idMessageSearch(this.props.messages, senderId)
        })
    }

    handleClose = (id) => {
        this.props.close(id)
        this.setState({
            selectedUserMessages : "",
            selectedUserId : ""
        })
    }   

    render() {
        this.state.nCheckedMessages = findNCheckedMessages(this.props.messages)
        return (
            <div>
                <Row>
                    <Col sm>
                        {!this.state.nCheckedMessages || this.state.nCheckedMessages.length === 0 ?
                            <Alert variant="dark">No Messages</Alert> 
                            :
                            <div>
                            <Alert variant="dark">Premium Trader Messages</Alert>
                            {this.state.nCheckedMessages.map(item => {
                                return(
                                <Card className="notif">
                                    <Card.Header className="notifHeader">
                                    <strong className="mr-auto">
                                        {
                                            idSearch(item.userId, this.props.users).id === this.props.auth.uid ? 
                                            "You"
                                            :
                                            idSearch(item.userId, this.props.users).firstname + " " + idSearch(item.userId, this.props.users).lastname
                                        }
                                    </strong>
                                    <small>{moment(item.userMessages[0].timestamp.toDate()).calendar()}</small>
                                    </Card.Header>
                                    <Card.Body style={{display:"flex"}} className="notifBody">
                                    Recent Message : {item.userMessages[0].message}
                                    <div className="ml-auto">
                                        <Button variant="primary" onClick = {() => this.handleReply(item.userId)}>Reply</Button>
                                        <Button className="ml-1" variant="danger" onClick = {() => this.handleClose(item.userId)} >Close</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            )})}
                            </div>
                        }
                    </Col>
                    <Col sm>
                        <MessageList users = {this.props.users} 
                                     auth = {this.props.auth} 
                                     message ={this.props.message} 
                                     messages = {this.state.selectedUserMessages}
                                     senderId = {this.state.selectedUserId} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TraderMessages
