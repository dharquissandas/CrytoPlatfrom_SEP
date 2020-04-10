import React, { Component } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

export class BroadcastMessage extends Component {
    state = {
        broadcastMessage : "",
        broadcastTitle : "",
        check : false,
        checkmessage : ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.broadcastTitle, this.state.broadcastMessage)
        let broadcast = {
            broadcastTitle : this.state.broadcastTitle,
            broadcastMessage : this.state.broadcastMessage
        }
        this.props.broadcast(broadcast)
        this.setState({
            check : true,
            message : "Broadcast Successful"
        })
    }

    render() {
        return (
            <div>
            <Card>
                <Card.Header as="h6">Broadcast Message</Card.Header>
                <Card.Body>
                    <Form autocomplete="off" id="broadcast" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="broadcastTitle">
                            <Form.Label>Broadcast Title</Form.Label>
                            <Form.Control required type="text" min="2" placeholder="Title" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="broadcastMessage">
                            <Form.Label>Broadcast Content</Form.Label>
                            <Form.Control required as="textarea" min="2" rows="3" placeholder="Content" onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    {this.state.check ? <Alert variant="success">{this.state.message}</Alert> : null }
                </Card.Body>
                <Card.Footer>
                    <Button type="submit" form="broadcast" variant="success">Broadcast</Button>
                </Card.Footer>
            </Card>
            </div>

        )
    }
}

export default BroadcastMessage