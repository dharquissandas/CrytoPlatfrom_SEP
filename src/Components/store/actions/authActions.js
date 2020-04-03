import firebase from "firebase/app";
import "firebase/auth";

export const signIn = (credentials) => {
    return (dispatch, getState) => {
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR' , err});
        })
    }
}

export const signOut = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() =>{
            dispatch({type: 'SIGNOUT_SUCCESS'});
        })
    }
}


export const traderSignUp = (newUser) => {
    return (dispatch,getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                em : newUser.email,
                firstname : newUser.firstname,
                lastname : newUser.lastname,
                account: newUser.account,
                username: newUser.username,
                bankAccountNumber : newUser.bankAccountNumber,
                sortCode : newUser.sortCode,
                idProof : newUser.idProof,
                fiatAmount : "0",
                premium : false

            });
            }).then(() =>{
                dispatch({type: "SIGNUP_SUCCESS"});
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERROR", err});
            });
    }
}

export const otherSignUp = (newUser) => {
    return (dispatch,getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                account: newUser.account,
                username: newUser.username,
            });
            }).then(() =>{
                dispatch({type: "SIGNUP_SUCCESS"});
            }).catch((err) => {
                dispatch({type: "SIGNUP_ERROR", err});
            });
    }
}

export const upgrade = () => {
    return (dispatch,getState, {getFirebase, getFirestore}) => {
        const fs = getFirestore();
        const userId = getState().firebase.auth.uid;
        return fs.collection('users').doc(userId).update({
            premium : true
        }).then(() => {
            dispatch({type: 'UPGRADE_SUCCESS'})
        }).catch((err) => {
            dispatch({type: 'UPGRADE_ERROR'}, err)
        })
    }
}
