import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import './Styles/auth.css'
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './Components/store/reducers/rootReducer'
import {Provider, useSelector} from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import FbConfig from './Config/FbConfig'
import firebase from "firebase/app"

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase,FbConfig)
    )
)

const profileSpecificProps = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableRedirectHandling: false,
    resetBeforeLogin: false
  }
  

const rrfProps={
    firebase,
    config: profileSpecificProps,
    dispatch: store.dispatch,
    createFirestoreInstance
}

function AuthIsLoaded({children}){
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return(
        <div >
        </div>
    )
    return children
}



ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><AuthIsLoaded><App /></AuthIsLoaded></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
