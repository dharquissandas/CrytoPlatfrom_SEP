const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

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
