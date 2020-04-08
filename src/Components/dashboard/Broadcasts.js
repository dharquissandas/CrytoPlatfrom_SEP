import React from 'react'
import {Card } from 'react-bootstrap'
import moment from 'moment'
import '../../App.css'

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

const check = (props) => {
    const {broadcasts} = props;
        if(broadcasts.length !== 0 && isToday(broadcasts[0].timestamp.toDate())){
            return true
        }
}

export const Broadcasts = (props) => {
    const {broadcasts} = props;
    console.log(broadcasts)
    return (
        check(props) ?
        <div className="section">
                {broadcasts && check(props) && broadcasts.map(item => {
                    if(isToday(item.timestamp.toDate())){
                    return(
                        <Card className="notif">
                            <Card.Header className="notifHeader">
                                <strong className="mr-auto">Broadcast</strong>
                                <small>{moment(item.timestamp.toDate()).calendar()}</small>
                            </Card.Header>
                                <Card.Body className="notifBody">
                                    <h6>{item.broadcastTitle}</h6>
                                    <p>{item.broadcastMessage}</p>
                                    <p>- {item.email}</p>
                                </Card.Body>
                        </Card>
                    )
                    }
                }) }
        </div>:
        <div>
            <Card className="notif">
                <Card.Body className="notifBody">
                    <h6>No Broadcasts for Today</h6>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Broadcasts