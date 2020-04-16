import React, { Component } from 'react'
import {Modal, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Export } from '../../store/actions/transactionActions'

export class ExportModal extends Component{
    filegen = async (cc) => {
        const fileName = "wallet";
        const json = JSON.stringify(cc);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        this.props.export(cc)
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => { window.location.reload() }, 2000);
    }

    render() {
        return (
            <div>
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{borderRight:" 1px solid rgba(0,0,0,.125)", borderLeft:" 1px solid rgba(0,0,0,.125)" }}
                >
                    <Modal.Header   style={{background:"#32383e", 
                        color:"#fff",
                        borderBottom:" 1px solid rgba(0,0,0,.125)",
                        borderTop:" 1px solid rgba(0,0,0,.125)"
                        }} closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Export Wallet
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body  style={{background:"#343a40", color:"#fff"}}>
                        <h5>Warning</h5>
                        <p>Exporting the chosen cryptocurrency wallet will remove it from your online store. Please keep the wallet safe.</p>
                    </Modal.Body>
                    <Modal.Footer style={{background:"#32383e", color:"#fff", borderTop:"1px solid rgba(0,0,0,.125)"}}>
                        <Form.Group>
                            <Button type="submit" variant="info" onClick={() => this.filegen(this.props.chosencc)}>Export</Button>
                        </Form.Group>
                        <Button variant="outline-info" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        transactions: state.firestore.ordered.transactions,
        auth : state.firebase.auth,
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        export : (wallet) => dispatch(Export(wallet)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportModal)
