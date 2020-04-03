import React from 'react'
import { Nav } from 'react-bootstrap'

function SignedOutLinks() {
    return (
        <div>
            <Nav>
                <Nav.Link eventKey={4} href="/register">Register</Nav.Link>                
                <Nav.Link eventKey={4} href="/">Sign In</Nav.Link>
            </Nav>
        </div>
    )
}

export default SignedOutLinks
