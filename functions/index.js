const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = (notification => {
    return admin.firestore().collection("notifications")
    .add(notification)
    .then(doc => console.log('notfication added', doc));
})

exports.broadcastCreated = functions.firestore
    .document("broadcasts/{broadcasts}")
    .onCreate(doc => {
        const broadcast =  doc.data();
        const notification = {
            broadcastTitle : `${broadcast.broadcastTitle}`,
            time : admin.firestore.FieldValue.serverTimestamp(),
            name : `${broadcast.username}`,
            email : `${broadcast.email}`
        }
        return createNotification(notification);
    })

// exports.transactionCreated = functions.firestore
//     .document("transactions/{transactionId}")
//     .onCreate(doc => {
//         const transaction  = doc.data();
//         const notification = {
//             content : `${transaction.transactionType} Transaction`,
//             time : admin.firestore.FieldValue.serverTimestamp()
//         }

//     return createNotification(notification);
// })


// exports.userJoined = functions.auth.user()
//     .onCreate(user => {
//         return admin.firestore().collection("users")
//             .doc(user.uid).get().then(doc => {
//                 const newUser = doc.data();
//                 const notification = {
//                     content : "User Signed Up",
//                     time: admin.firestore.FieldValue.serverTimestamp()
//                 }
//                 return createNotification(notification);
//             })
// })

