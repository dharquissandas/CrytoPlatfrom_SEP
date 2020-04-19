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
        let broadcast = {
            broadcastTitle : this.state.broadcastTitle,
            broadcastMessage : this.state.broadcastMessage
        }
        this.props.broadcast(broadcast)
        this.setState({
            check : true,
            message : "Broadcast Successful"
        })

        document.getElementById("broadcast").reset();
    }

    render() {
        return (
            <div>
            <Card bg="dark" text="white" border="info">
                <Card.Header as="h6">Broadcast Message</Card.Header>
                <Card.Body>
                    <Form autocomplete="off" id="broadcast" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="broadcastTitle">
                            <Form.Label>Broadcast Title</Form.Label>
                            <Form.Control required type="text" minLength="2" maxLength="30" placeholder="Title" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="broadcastMessage">
                            <Form.Label>Broadcast Content</Form.Label>
                            <Form.Control required as="textarea" minLength="2" maxLength="250" rows="3" placeholder="Content" onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                    {this.state.check ? <Alert variant="success">{this.state.message}</Alert> : null }
                </Card.Body>
                <Card.Footer>
                    <Button type="submit" form="broadcast" variant="info">Broadcast</Button>
                </Card.Footer>
            </Card>
            </div>

        )
    }
}

export default BroadcastMessage