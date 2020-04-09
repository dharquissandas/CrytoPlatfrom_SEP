import React, { Component } from 'react'
import {cc1} from '../../cryptocurrencies/cc1'
import {cc2} from '../../cryptocurrencies/cc2'
import {cc3} from '../../cryptocurrencies/cc3'
import {Card, Form, Col, Button, Alert} from 'react-bootstrap'
import { userData , findUser, idSearch, categorySearch } from '../../utils/DashboardUtils'
import moment from 'moment'
import Search from 'react-search'

export class SearchUsers extends Component {
    state = {
        userId : "",
        userType : "Any",
        user : "",
        check : false,
        message : "",
        results : null,
        resultscheck : false
    }

    formatText = (account) => {
        if(account === "trader") {return "Trader"}
        else if(account === "analyst") {return "Analyst"}
        else{ return "Administrator" }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    setUser = (items) => {
        this.setState({
            user : items[0]
        })
    }
    

    handleSubmit = (e) => {
        console.log(this.state)
        e.preventDefault()
        if(typeof this.state.user !== 'undefined'){
            this.setState({
                resultscheck : true,
                results : [findUser(this.props.auth.uid, this.props.users,this.state.user, "any")]
            })
        }
        else if(this.state.userId !== ""){
            this.setState({
                resultscheck : true,
                results : [idSearch(this.state.userId,this.props.users)]
            })
        }
        else if(this.state.userType !== ""){
            this.setState({
                resultscheck : true,
                results : categorySearch(this.state.userType.toLowerCase(),this.props.users)
            })

        }
        else{}
    }

    render() {
        console.log(this.state.results)
        let items = userData(this.props.users, this.props.auth.uid, "any")
        return (
            <div>
                <Card>
                    <Card.Header as="h6">
                        Search Users
                    </Card.Header>
                    <Card.Body>
                        <h6>To search for user, atleast one of the fields below must be filled </h6>
                        <Form id="search" autocomplete="off" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>User Email</Form.Label>
                                <Search items={items}
                                    placeholder='Search email of Recipient'
                                    maxSelected={1}
                                    multiple={true}
                                    autocomplete="off"
                                    onItemsChanged={this.setUser.bind(this)}
                                    />
                            </Form.Group>

                            <Form.Group controlId="userId">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control autocomplete="off" type="text"  placeholder="User ID" min="28" max="28" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="userType">
                                <Form.Label>User Type</Form.Label>
                                <Form.Control onChange={this.handleChange} as="select" custom>
                                    <option>Any</option>
                                    <option>Trader</option>
                                    <option>Analyst</option>
                                    <option>Administrator</option>
                                </Form.Control>
                            </Form.Group>
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
                        <Card className="notif" key={item.id}>
                            <Card.Header className="notifHeader">
                            <strong className="mr-auto">{item.firstname} {item.lastname}</strong>
                            <small>{item.account === "trader" && item.premium ?
                                "Premium Trader":
                                this.formatText(item.account)
                            }</small>
                            </Card.Header>
                            <Card.Body className="notifBody">
                            <p>Email: {item.em}</p>
                            <p>User ID: {item.id}</p>
                            {item.account === "trader" &&
                            <p>Fiat Amount: £{parseFloat(item.fiatAmount).toFixed(2)}</p>
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


export default SearchUsers