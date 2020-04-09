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