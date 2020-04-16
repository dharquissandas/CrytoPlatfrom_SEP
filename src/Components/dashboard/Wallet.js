import React, { Component } from 'react'
import { Tab, Nav, Row, Col} from 'react-bootstrap'
import Navigationbar from '../layout/Navigationbar'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { createData } from '../utils/WalletUtiils'
import {cc1} from '../cryptocurrencies/cc1'
import {cc2} from '../cryptocurrencies/cc2'
import {cc3} from '../cryptocurrencies/cc3'
import Upgrade from '../auth/Upgrade';
import ExportModal from './modals/ExportModal'
import FiatWallet from './walletComponents/FiatWallet'
import OverviewAlert from '../dashboard/dashboardComponents/OverviewAlert'
import ImportWallets from './walletComponents/ImportWallets';
import CC1Wallet from './walletComponents/CC1Wallet';
import CC2Wallet from './walletComponents/CC2Wallet';
import CC3Wallet from './walletComponents/CC3Wallet';

export class Wallet extends Component {

    state = {
        finaldata : {},
        loaded : false,
        upgradeModal : false,
        exportModal : false,
        chosencc : []
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

    reinitData = () => {
        let {auth, transactions} = this.props;
        createData(auth, transactions).then((data) => {
            this.setState({
                finaldata : data
            })
        })
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
                <Navigationbar place="wallet" pass={() => this.setUpgradeModal(true)} />
                <Upgrade show={this.state.upgradeModal} onHide={() => this.setUpgradeModal(false)} />
                <ExportModal chosencc ={this.state.chosencc} show={this.state.exportModal} onHide={() => this.setExportModal(false)} />
                <br></br>
                <Tab.Container unmountOnExit defaultActiveKey="first">
                    <Row style={{marginRight : "0px"}}>
                        <Col sm={3} >
                            <Nav variant="pills" className="ml-1 flex-column">
                                <Nav.Item>
                                    <Nav.Link className="navitems" eventKey="first">Fiat Wallet</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className="navitems" eventKey="second">Import Wallet</Nav.Link>
                                </Nav.Item>
                                <br />
                                {data.cc1Amount !== 0 ?
                                <Nav.Item>
                                    <Nav.Link className="navitems" eventKey="third">{cc1.getName()} wallet</Nav.Link>
                                </Nav.Item> :
                                null
                                }
                                {data.cc2Amount !== 0 ?
                                <Nav.Item>
                                    <Nav.Link className="navitems" eventKey="fourth">{cc2.getName()} wallet</Nav.Link>
                                </Nav.Item> :
                                null
                                }
                                {data.cc3Amount !== 0 ?
                                <Nav.Item>
                                    <Nav.Link className="navitems" eventKey="fifth">{cc3.getName()} wallet</Nav.Link>
                                </Nav.Item> :
                                null
                                }
                            </Nav>
                        </Col>
                        <Col sm={9} className="mobilealign">
                            <div>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <OverviewAlert detailed profile = {profile} finalData= {data} />
                                    <FiatWallet  profile={profile}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <OverviewAlert detailed profile = {profile} finalData= {this.state.finaldata} />
                                    <ImportWallets reinitData = {this.reinitData} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <CC1Wallet exportModal = {this.setExportModal} finalData = {this.state.finaldata} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <CC2Wallet exportModal = {this.setExportModal} finalData = {this.state.finaldata} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                    <CC3Wallet exportModal = {this.setExportModal} finalData = {this.state.finaldata} />
                                </Tab.Pane>
                            </Tab.Content>
                        </div> 
                        </Col>
                    </Row>
                </Tab.Container>
                <br />
            </div>:
            <div></div>
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