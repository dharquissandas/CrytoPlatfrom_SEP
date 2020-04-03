import React, { Component } from 'react'
import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap'
import Navigationbar from '../layout/Navigationbar'
import AddFiatCurrency from './AddFiatCurrency'
import FiatRefund from './FiatRefund'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { createData } from '../utils/WalletUtiils'
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import Upgrade from '../auth/Upgrade';
import ExportModal from './ExportModal'
import ImportModal from './ImportModal'

export class Wallet extends Component {

    state = {
        finaldata : {},
        loaded : false,
        modalShow : false,
        checkModal : false,
        upgradeModal : false,
        exportModal : false,
        importModal : false,
        chosencc : []
    }

    setModalShow = (bool) => {
        this.setState({
            modalShow : bool
        })
    }

    setCheckModalShow = (bool) => {
        this.setState({
            checkModal : bool
        })
    }

    setUpgradeModal = (bool) => {
        this.setState({
            upgradeModal : bool
        })
    }

    setExportModal = (bool, cc) => {
        this.setState({
            exportModal : bool,
            chosencc : cc
        })
    }

    setImportModal = (bool) => {
        this.setState({
            importModal : bool,
        })
    }

    setImportModalFalse = () => {
        this.setState({
            importModal : false
        })
        if(this.props.importerror){
            window.location.reload()
        }
    }

    render() {
        let {auth, transactions, profile} = this.props;
        if(!auth.uid ) return <Redirect to="/"/>
        createData(auth, transactions).then((data) => {
            this.state.loaded = true
            this.state.finaldata = data
        })
        const data = this.state.finaldata
        return (
            this.state.loaded && profile.isLoaded ?
            <div>
                <Navigationbar pass={() => this.setUpgradeModal(true)} />
                <Upgrade show={this.state.upgradeModal} onHide={() => this.setUpgradeModal(false)} />
                <ExportModal chosencc ={this.state.chosencc} show={this.state.exportModal} onHide={() => this.setExportModal(false)} />
                <ImportModal show={this.state.importModal} onHide={() => this.setImportModalFalse()} /> 
                <AddFiatCurrency show={this.state.modalShow} onHide={() => this.setModalShow(false)} /> 
                <FiatRefund show={this.state.checkModal} onHide={() => this.setCheckModalShow(false)} /> 
                <Container>
                    <Row>
                        <Col sm>
                            <Card>
                                <Card.Header>Fiat Wallet</Card.Header>
                                <Card.Body>
                                    <Card.Title>Current Amount: {profile.fiatAmount}</Card.Title>
                                    <Button className="mr-2" variant="primary" onClick={() => this.setModalShow(true)}>
                                        Add Fiat Currency
                                    </Button>
                                    {profile.fiatAmount === "0"?
                                    <Button variant="primary" disabled onClick={() => this.setCheckModalShow(true)} >
                                        Refund Money To Registered Card
                                    </Button>:
                                    <Button variant="primary" onClick={() => this.setCheckModalShow(true)} >
                                        Refund Money To Registered Card
                                    </Button>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card>
                                <Card.Header>Import Wallet</Card.Header>
                                <Card.Body>
                                    <Card.Title>Import Exisiting Wallets Here</Card.Title>
                                    <Button variant="primary" onClick={() => this.setImportModal(true)}>Import Wallet</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm>
                            <Card>
                                <Card.Header>
                                    {cc1.getName()}
                                        <Button onClick={() => this.setExportModal(true, data.cc1Transactions)} style={{float: "right"}} variant="success">Export</Button>
                                </Card.Header> 
                                <Card.Body>
                                    <Card.Subtitle>Current Amount</Card.Subtitle>
                                    <Card.Text>{data.cc1Amount}</Card.Text>
                                    <hr/>
                                    <Card>
                                        <Card.Header>Wallet History</Card.Header>
                                        <ListGroup variant="flush">
                                        {data.cc1Transactions && data.cc1Transactions.map(item => {
                                            return(
                                                <ListGroup.Item key={item.id}>
                                                    <p>{item.transactionType}</p>
                                                    <p>{item.purchasedAmount}</p>
                                                    <p>{item.transactionType === "transfer" ? 
                                                    item.recipientemail :
                                                    item.purchasePrice
                                                    }</p>
                                                    <p>{item.timestamp.toDate().toString()}</p>
                                                </ListGroup.Item>
                                            )
                                        }) }
                                        </ListGroup>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card>
                                <Card.Header>
                                    {cc2.getName()}
                                    <Button onClick={() => this.setExportModal(true, data.cc2Transactions)} style={{float: "right"}} variant="success">Export</Button>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Current Amount</Card.Subtitle>
                                    <Card.Text>{data.cc2Amount}</Card.Text>
                                    <hr/>
                                    <Card>
                                        <Card.Header>Wallet History</Card.Header>
                                        <ListGroup variant="flush">
                                        {data.cc2Transactions && data.cc2Transactions.map(item => {
                                            return(
                                                <ListGroup.Item key={item.id}>
                                                    <p>{item.transactionType}</p>
                                                    <p>{item.purchasedAmount}</p>
                                                    <p>{item.transactionType === "transfer" ? 
                                                    item.recipientemail :
                                                    item.purchasePrice
                                                    }</p>
                                                    <p>{item.timestamp.toDate().toString()}</p>
                                                </ListGroup.Item>
                                            )
                                        }) }
                                        </ListGroup>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm>  
                            <Card>
                                <Card.Header>
                                    {cc3.getName()}
                                    <Button onClick={() => this.setExportModal(true, data.cc3Transactions)} style={{float: "right"}} variant="success">Export</Button>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Current Amount</Card.Subtitle>
                                    <Card.Text>{data.cc3Amount}</Card.Text>
                                    <hr/>
                                    <Card>
                                        <Card.Header>Wallet History</Card.Header>
                                        <ListGroup variant="flush">
                                        {data.cc3Transactions.map(item => {
                                            return(
                                                <ListGroup.Item key={item.id}>
                                                    <p>{item.transactionType}</p>
                                                    <p>{item.purchasedAmount}</p>
                                                    <p>{item.transactionType === "transfer" ? 
                                                    item.recipientemail :
                                                    item.purchasePrice
                                                    }</p>
                                                    <p>{item.timestamp.toDate().toString()}</p>
                                                </ListGroup.Item>
                                            )
                                        }) }
                                        </ListGroup>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            </Container>          
            </div> 
            : 
            <Container>
            </Container> 
        )
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        importerror: state.transactions.importError,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications,
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        {collection: "transactions", orderBy : ["timestamp"]},
        {collection: "notifications", limit: 5, orderBy: ["time"]}
    ])
)(Wallet)