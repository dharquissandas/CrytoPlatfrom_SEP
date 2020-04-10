import React, { Component } from 'react'
import {Card, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Import } from '../../store/actions/transactionActions';
import FileUploader from 'file-uploader-js';

export class ImportWallets extends Component {
    state = {
        imported : false
    }

    uploadedJson = (fileData) => {
        let file = JSON.parse(fileData)
        for(let i = 0; i < file.length; i++){
            this.props.import(file[i])
        }

        this.setState({
            imported : true
        })

        window.location.reload()
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="h6">Import Wallet</Card.Header>
                    <Card.Body>
                        <h6>Please Import your wallet</h6>
                        <Alert variant ="dark"> 
                            <FileUploader
                                accept=".json"
                                uploadedFileCallback={e => {
                                    this.uploadedJson(e);
                                }}
                                />
                        </Alert>
                        {this.state.imported ?
                            this.props.importerror ?
                                <Alert variant="danger">{this.props.importerror}</Alert> :  
                                <Alert variant="success">Import Success, please wait a short while for the import to be reflected on the system</Alert>
                                :
                            null
                        }
                    </Card.Body>
                </Card>
            </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        import : (wallet) => dispatch(Import(wallet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWallets)

