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

export const Broadcasts = (props) => {
    const {broadcasts} = props;
    const filterBroadcasts = broadcasts !== undefined ? broadcasts.filter((item) => isToday(item.timestamp.toDate())) : [];

    if (filterBroadcasts.length > 0) {
        return (
            <div className="section">
                { filterBroadcasts.map(item => (
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
                )) }
            </div>
        );
    } else {
        return (
            <div>
                <Card className="notif">
                    <Card.Body className="notifBody">
                        <h6 style={{ marginBottom: 0 }}>No Broadcasts for Today</h6>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default Broadcasts
