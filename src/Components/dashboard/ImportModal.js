import React, { Component } from 'react'
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Import } from '../store/actions/transactionActions';
import FileUploader from 'file-uploader-js';

export class ImportModal extends Component{
    uploadedJson = (fileData) => {
        let file = JSON.parse(fileData)
        for(let i = 0; i < file.length; i++){
            // console.log(file[i])
            this.props.import(file[i])
        }
    }
    
    render() {
        return (
            <div>
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Import Wallet
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Please Import your wallet here</h5>
                        <Alert variant ="dark"> 
                            <FileUploader
                                accept=".json"
                                uploadedFileCallback={e => {
                                    this.uploadedJson(e);
                                }}
                                />
                        </Alert>
                        {this.props.importerror ? <Alert variant="danger">{this.props.importerror}</Alert> : null }
                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.importerror ?
                        <Form.Group>
                            <Button disabled type="submit" variant="success" onClick={() => this.props.onHide()}>Import</Button>
                        </Form.Group>
                        :
                        <Form.Group>
                            <Button type="submit" variant="success" onClick={() => this.props.onHide()}>Import</Button>
                        </Form.Group>
                        }
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportModal)
