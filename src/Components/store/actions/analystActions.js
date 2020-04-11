export const Broadcast = (broadcast) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();
        const userId = getState().firebase.auth.uid;
        const email = getState().firebase.auth.email;
        const username = getState().firebase.profile.username;
        fs.collection("broadcasts").add({
            ...broadcast,
            userId: userId,
            email : email,
            username : username,
            timestamp: new Date()
        }).then(() => {
            dispatch({type: 'BROADCAST', broadcast});
        }).catch((err) => {
            dispatch({type: 'BROADCAST_ERROR', err})
        })
        
    }
}

export const deleteBroadcast = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();
        fs.collection("broadcasts").doc(id).delete()
        .then(() => {
            dispatch({type: 'BROADCAST_DELETED', id});
        }).catch((err) => {
            dispatch({type: 'BROADCAST_ERROR', err})
        })
        
    }
}

export const Message = (oldmessages, message) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        //DB Call
        const fs = getFirestore();
        fs.collection("messages").doc(message.inituserId).set({
            userId : message.inituserId,
            checked : false,
            userMessages : [message, ...oldmessages ]

        }).then(() => {
            dispatch({type: 'MESSAGE', message});
        }).catch((err) => {
            dispatch({type: 'MESSAGE_ERROR', err})
        })
        
    }
}

export const Close = (id) => {
    return(dispatch, getState, {getFirebase, getFirestore}) => {
        const fs = getFirestore()
        fs.collection("messages").doc(id).update({
            checked : true
        }).then(() => {
            dispatch({type: 'CLOSE', id})
        }).catch((err) => {
            dispatch({type: 'CLOSE_ERROR', err})
        })
    }
}

