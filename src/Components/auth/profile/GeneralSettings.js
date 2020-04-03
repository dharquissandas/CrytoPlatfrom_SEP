import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';

export class GeneralSettings extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="H5">General Settings</Card.Header>
                    <Card.Body>
                    </Card.Body>
                    <Card.Footer>
                    <Button variant="success" form="register" type="submit">Update</Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default GeneralSettings
