const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
var db = admin.database();

exports.triggerTotalCounter = functions.https.onCall(async (total) => {

    console.log("Total: ", total)
    let ref = db.ref('stats')
    // ref.on(snapshot => {
    //     console.log("data", snapshot.val())
    // })
    ref.set({ fuck: "fuck333" })
    return "add hole"
})