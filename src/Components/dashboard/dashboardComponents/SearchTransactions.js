import React, { Component } from 'react'
import {cc1} from '../../cryptocurrencies/cc1'
import {cc2} from '../../cryptocurrencies/cc2'
import {cc3} from '../../cryptocurrencies/cc3'
import {Card, Form, Col, Button, Alert} from 'react-bootstrap'
import { search } from '../../utils/DashboardUtils'
import moment from 'moment'

export class SearchTransactions extends Component {
    state = {
        cryptocurrency : "",
        startDate : "",
        endDate : "",
        tt : "Any",
        check : false,
        message : "",
        results : null,
        resultscheck : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    renderText= (event) => {
        if(event === "buy"){ return "Buy" }
        else if(event === "sell"){ return "Sell"}
        else{ return "Transfer"}
    }
    
    getMinDate = () => {
        let date  = "" + moment().subtract(30, 'days').calendar();
        let year = date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9)
        let day = date.charAt(3) + date.charAt(4)
        let month =  date.charAt(0) + date.charAt(1)
        return year + "-" + month + "-" + day
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.cryptocurrency === "" || this.state.cryptocurrency === "Choose Cryptocurrency"){
            this.setState({
                check : true,
                message : "Please Select A Valid Cryptocurrency"
            })
        }
        else{
            let a = {
                cryptocurrency : this.state.cryptocurrency,
                startDate : this.state.startDate,
                endDate : this.state.endDate,
                tt : this.state.tt
            }
            
            let results = search(this.props.transactions, a)
            this.setState({
                results : results,
                resultscheck : true,
                check : false
            })
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="h6">
                        Search Transactions
                    </Card.Header>
                    <Card.Body>
                        <Form id="search" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="cryptocurrency">
                                <Form.Label>Cryptocurrency</Form.Label>
                                <Form.Control required onChange={this.handleChange} as="select" custom>
                                    <option>Choose Cryptocurrency</option>
                                    <option>{cc1.getName()}</option>
                                    <option>{cc2.getName()}</option>
                                    <option>{cc3.getName()}</option>
                                </Form.Control>
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

                            <Form.Group controlId="tt">
                                <Form.Label>Transaction Type</Form.Label>
                                <Form.Control required onChange={this.handleChange} as="select" custom>
                                    <option>Any</option>
                                    <option>Buy</option>
                                    <option>Sell</option>
                                    <option>Transfer</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        {this.state.check && 
                            <Alert variant="danger">{this.state.message}</Alert>
                        }
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
                this.state.results !== null && this.state.results.slice(0,10).map(item => {
                    return(
                        <Card className="notif" key={item.id}>
                            <Card.Header className="notifHeader">
                            <strong  className="mr-auto">{this.renderText(item.transactionType)}</strong>
                            <small>{moment(item.timestamp.toDate()).calendar()}</small>
                            </Card.Header>
                            <Card.Body className="notifBody">
                            <p>Amount: {item.purchasedAmount}</p>
                            {item.transactionType === "transfer" ? 
                            <div>
                                <p>Sender: {item.senderemail} </p>
                                <p>Recipent: {item.recipientemail} </p> 
                            </div>
                            :
                            <p>Purchase Price: £{item.purchasePrice.toFixed(2)} </p>
                            }
                            </Card.Body>
                        </Card>
                    )
                }).reverse()
            }
            </div>
        )
    }
}

export default SearchTransactions
