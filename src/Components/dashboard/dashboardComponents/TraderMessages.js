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
                        <Card bg="dark" text="white" border="info"><Card.Body className="messagingTitle">No Messages</Card.Body></Card>
                            :
                            <div>
                            <Card bg="dark" text="white" border="info"><Card.Body className="messagingTitle">Premium Trader Messages</Card.Body></Card>        
                            <br></br>                        
                            {this.state.nCheckedMessages.map(item => {
                                return(
                                <Card bg="dark" text="white" border="info" className="notif">
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
                                    <Card.Body className="notifBody">
                                    <div>
                                        Recent Message : {item.userMessages[0].message}
                                    </div>
                                    <br></br>
                                    <div style={{textAlign:"end"}}>
                                        <Button variant="info" onClick = {() => this.handleReply(item.userId)}>Reply</Button>
                                        <Button className="ml-1" variant="outline-info" onClick = {() => this.handleClose(item.userId)} >End</Button>
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
