import React from 'react'
import {Card} from 'react-bootstrap'

const TransactionSummary = ({transaction}) => {
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{transaction.transactiontype}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{transaction.cryptocurrency}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{transaction.amount}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{transaction.timestamp.toDate().toDateString()}</Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TransactionSummary
