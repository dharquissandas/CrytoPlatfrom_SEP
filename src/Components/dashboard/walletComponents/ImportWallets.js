import React, { Component } from 'react'
import {Card, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Import } from '../../store/actions/transactionActions';
import { idSearch } from '../../utils/DashboardUtils';
import FileUploader from 'file-uploader-js';

export class ImportWallets extends Component {
    state = {
        imported : true,
        importcheck : false,
        message : "Successfully Imported",
        tcheck : false
    }

    uploadedJson = async (fileData) => {
        this.setState({
            message : ""
        })
        let file;
        try {
            file = JSON.parse(fileData)
            if(file[0].userId === this.props.auth.uid){
                for(let i = 0; i<file.length; i++){
                    if(idSearch(file[i].id,this.props.transactions) != null){
                        this.setState({tcheck : true})
                        break
                    }
                }
                if(!this.state.tcheck){
                    for(let i = 0; i < file.length; i++){
                        this.props.import(file[i])
                    }
                    setTimeout(() => {
                            this.setState({
                                imported : true,
                                importcheck : true,        
                                message : "Successfully Imported"
                            })
                    }, 800);
                }
                else{
                    this.setState({ 
                        imported : true,
                        importcheck : true,
                        message : "Already Imported"
                    })
                }
            }
            else{
                this.setState({ 
                    imported : true,
                    importcheck : true,
                    message : "Unauthorised Import"
                })
            }
        }
        catch(err) { 
            this.setState({ 
                imported : true,
                importcheck : true,
                message : "Invalid Import File"
            })
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <Card bg="dark" text="white" border="info">
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
                            this.state.importcheck ?
                                this.state.message === "Successfully Imported" ?
                            <Alert variant="success">{this.state.message}</Alert>:
                            <Alert variant="danger">{this.state.message}</Alert>
                            :
                            null
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

