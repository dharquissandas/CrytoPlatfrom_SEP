import React, { Component } from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import { userData , findUser, idSearch, categorySearch } from '../../utils/DashboardUtils'
import Search from 'react-search'

export class SearchUsers extends Component {
    state = {
        userId : "",
        userType : "Any",
        user : "",
        check : false,
        message : "",
        results : null,
        resultscheck : false,
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
        e.preventDefault()
        if(typeof this.state.user !== 'undefined'){
            this.setState({
                resultscheck : true,
                results : [findUser(this.props.auth.uid, this.props.users,this.state.user, "any")],
            })
        }
        else if(this.state.userId !== ""){
            let r = idSearch(this.state.userId,this.props.users)
            if(r == null){
                this.setState({
                    resultscheck : true,
                    results : []
                })
            }else{
                this.setState({
                    resultscheck : true,
                    results : [r]
                })
            }
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
        console.log(this.state.qsearch)
        let items = userData(this.props.users, this.props.auth.uid, "any")
        return (
            <div>
                <Card bg="dark" text="white" border="info">
                    <Card.Header as="h6">
                        Search Users
                    </Card.Header>
                    <Card.Body>
                        <h6>To search for user, atleast one of the fields below must be filled </h6>
                        <Form autocomplete="off" id="users" onSubmit={this.handleSubmit}>
                            <Form.Group id="search">
                                <Form.Label>User Quick Search</Form.Label>
                                <Search items={items}
                                    placeholder='Search email of Recipient'
                                    maxSelected={1}
                                    multiple={true}
                                    autocomplete = "off"
                                    onItemsChanged={this.setUser.bind(this)}
                                    />
                            </Form.Group>
                            <hr></hr>
                            <Form.Group controlId="userId">
                                <Form.Label>User ID</Form.Label>
                                {this.state.user == null ?
                                <Form.Control autocomplete="off" type="text"  placeholder="User ID" min="28" max="28" onChange={this.handleChange} /> :
                                <Form.Control autocomplete="off" type="text" disabled placeholder="User ID" min="28" max="28" onChange={this.handleChange} />
                                }
                            </Form.Group>

                            <Form.Group controlId="userType">
                                <Form.Label>User Type</Form.Label>
                                {this.state.user == null ?
                                <Form.Control onChange={this.handleChange} as="select" custom>
                                    <option>Any</option>
                                    <option>Trader</option>
                                    <option>Analyst</option>
                                    <option>Administrator</option>
                                </Form.Control> 
                                :
                                <Form.Control disabled onChange={this.handleChange} as="select" custom>
                                    <option>Any</option>
                                    <option>Trader</option>
                                    <option>Analyst</option>
                                    <option>Administrator</option>
                                </Form.Control>                               
                                }
                            </Form.Group>
                        </Form>
                    </Card.Body>    
                    <Card.Footer>
                        <Button variant="info" type="submit" form="users">Search</Button>
                    </Card.Footer>
                </Card>
                {this.state.resultscheck &&
                    <div>
                        <br></br>
                        {this.state.results.length !== 0 ?
                        <Card bg="dark" text="white" border="info"><Card.Body className="messagingTitle">Results - {this.state.results.length} results</Card.Body></Card>:
                        <Card bg="dark" text="white" border="info"><Card.Body className="messagingTitle">No Results</Card.Body></Card>
                        }   
                    </div>
                }
                <br></br>
                {this.state.resultscheck &&
                this.state.results !== null && this.state.results.length !== 0 && this.state.results.map(item => {
                    console.log(this.state.results)
                    return(
                        <Card bg="dark" text="white" border="info" className="notif" key={item.id}>
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
