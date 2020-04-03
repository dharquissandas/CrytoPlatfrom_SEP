import authReducer from './authReducer'
import transactionReducer from './transactionReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import walletReducer from './walletReducer'
import analystReducer from './analystReducer'

const rootReducer = combineReducers({
    auth:authReducer,
    wallets: walletReducer,
    broadcasts: analystReducer,
    transactions: transactionReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer
