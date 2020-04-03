import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

export const FbConfig = {
    apiKey: "AIzaSyCqD3FZl2nxYcb8_fTayW2qiiRSI1W-kIc",
    authDomain: "cryptocplat.firebaseapp.com",
    databaseURL: "https://cryptocplat.firebaseio.com",
    projectId: "cryptocplat",
    storageBucket: "cryptocplat.appspot.com",
    messagingSenderId: "120297632629",
    appId: "1:120297632629:web:1cdaa37500a187514a193c",
    measurementId: "G-7PSL462V4G"
};
  // Initialize Firebase
  firebase.initializeApp(FbConfig)
  firebase.analytics()
  firebase.firestore()
  
  export default firebase