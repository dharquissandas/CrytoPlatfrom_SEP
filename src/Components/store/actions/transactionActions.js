
export const Transact = (transaction) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();
        const userId = getState().firebase.auth.uid;
        let prevAmount = parseFloat(getState().firebase.profile.fiatAmount)
        if(transaction.transactionType === "buy"){
            prevAmount = prevAmount - parseFloat(transaction.totalPrice)
        }
        else if(transaction.transactionType === "sell"){
            prevAmount = prevAmount + parseFloat(transaction.totalPrice)
        }
        else{}
        prevAmount = "" + prevAmount
        fs.collection("transactions").add({
            ...transaction,
            userId: userId,
            timestamp: new Date()
        }).then(()=> {
            return fs.collection('users').doc(userId).update({
                fiatAmount : prevAmount
            })
        }).then(() => {
            dispatch({type: 'TRANSACT', transaction});
        }).catch((err) => {
            dispatch({type: 'TRANSACT_ERROR', err})
        })
        
    }
}


export const Export = (transactions) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();

        for(let i=0; i<transactions.length; i++){
            fs.collection("transactions").doc(transactions[i].id).delete()
            .then(() => {
                dispatch({type: 'EXPORT', transactions});
            }).catch((err) => {
                dispatch({type: 'EXPORT_ERROR', err})
            })
        }
    }
}

export const Import = (transaction) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const firestore = getFirestore();
        const fb = getFirebase();
        const userId = getState().firebase.auth.uid;

        firestore.collection("transactions").doc(transaction.id).get()
        .then(docSnapshot => {
            if (!docSnapshot.exists) {
                if(transaction.userId === userId ||(transaction.recipientid && transaction.recipientid === userId) ){
                    if(transaction.transactionType === "transfer"){
                        firestore.collection("transactions").doc(transaction.id).set({
                            cryptocurrency : transaction.cryptocurrency,
                            purchasedAmount : transaction.purchasedAmount,
                            recipientemail : transaction.recipientemail,
                            recipientid : transaction.recipientid,
                            senderemail : transaction.senderemail,
                            timestamp : new fb.firestore.Timestamp(transaction.timestamp.seconds,transaction.timestamp.nanoseconds),
                            transactionType : transaction.transactionType,
                            userId : transaction.userId
                        })
                        .then(() => {
                            dispatch({type: 'IMPORT', transaction});
                        }).catch((err) => {
                            dispatch({type: 'IMPORT_ERROR', err})
                        })
                    }
                    else{
                        firestore.collection("transactions").doc(transaction.id).set({
                            cryptocurrency : transaction.cryptocurrency,
                            purchasePrice : transaction.purchasePrice,
                            purchasedAmount : transaction.purchasedAmount,
                            totalPrice : transaction.totalPrice.toString(),
                            timestamp : new fb.firestore.Timestamp(transaction.timestamp.seconds,transaction.timestamp.nanoseconds),
                            transactionType : transaction.transactionType,
                            userId : transaction.userId
                        })
                        .then(() => {
                            dispatch({type: 'IMPORT', transaction});
                        }).catch((err) => {
                            dispatch({type: 'IMPORT_ERROR', err})
                        })
                    }
                }
                else{
                    dispatch({type: 'IMPORT_ERROR', err: "Unautherised Import"})                    
                }
            }
            else{
            dispatch({type: 'IMPORT_ERROR', err: "Already Imported"})
          }
        });
    }
}