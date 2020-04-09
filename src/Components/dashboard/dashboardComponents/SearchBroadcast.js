import React, { Component } from 'react'
import {Card, Form, Col, Button, Alert} from 'react-bootstrap'
import { bSearch, findUser, userData } from '../../utils/DashboardUtils'
import moment from 'moment'
import Search from 'react-search'

export class SearchTransactions extends Component {
    state = {
        analyst : "",
        startDate : "",
        endDate : "",
        check : false,
        message : "",
        results : null,
        resultscheck : false,
        deletecheck : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    getMinDate = () => {
        let date  = "" + moment().subtract(30, 'days').calendar();
        let year = date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9)
        let day = date.charAt(3) + date.charAt(4)
        let month =  date.charAt(0) + date.charAt(1)
        return year + "-" + month + "-" + day
    }

    setAnalyst = (items) => {
        this.setState({
            analyst : items[0]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let a = {
            analyst : findUser(this.props.auth.uid,this.props.users,this.state.analyst, "analyst"),
            startDate : this.state.startDate,
            endDate : this.state.endDate
        }
        this.setState({
            results : bSearch(this.props.broadcasts, a),
            resultscheck : true
        })
    }

    handleDelete = (uid, e) =>{
        this.props.deleteBroadcast(uid)
        this.setState({
            resultscheck : false,
            deletecheck : true
        })

        document.getElementById("search").reset();
    }

    render() {
        let items = userData(this.props.users, this.props.auth.uid, "analyst")
        return (
            <div>
                <Card>
                    <Card.Header as="h6">
                        Search Broadcasts
                    </Card.Header>
                    <Card.Body>
                        <Form id="search" autocomplete="off" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Broadcasting Analyst</Form.Label>
                                <Search items={items}
                                    placeholder='Search Email of Recipient'
                                    maxSelected={1}
                                    multiple={true}
                                    autocomplete="off"
                                    onItemsChanged={this.setAnalyst.bind(this)} />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="startDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" min = {this.getMinDate()} max = {new Date().toISOString().substr(0,10)} required onChange={this.handleChange} />
                                </Form.Group>
                                
                                <Form.Group as={Col} controlId="endDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" min = {this.state.startDate} max = {new Date().toISOString().substr(0,10)} required onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                        {this.state.deletecheck && 
                            <Alert variant="success">Successfully Deleted</Alert>
                        }
                        </Form>
                    </Card.Body>    
                    <Card.Footer>
                        <Button variant="success" type="submit" form="search">Search</Button>
                    </Card.Footer>
                </Card>
                {this.state.resultscheck &&
                    <div>
                        <br></br>
                    <Alert variant="secondary">
                        {this.state.results.length === 0 ? 
                        <h6>No results found</h6>:
                        <h6>Results - {this.state.results.length} results</h6>}
                    </Alert>
                    </div>
                }
                {this.state.resultscheck &&
                this.state.results !== null && this.state.results.map(item => {
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
                            <Card.Footer>
                                <Button variant="danger" type="submit" onClick={() => this.handleDelete(item.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    )
                }).reverse()
            }
            </div>
        )
    }
}

export default SearchTransactions
