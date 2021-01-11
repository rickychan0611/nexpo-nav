const functions = require('firebase-functions');
const admin = require('firebase-admin');
var db = admin.database();

exports.minusTotalCounter = functions.https.onCall(async (data) => {
    console.log("MINUS")
    let MM_YYYY = data.MM_YYYY
    let DD = data.DD

    let path = 'stats/' + MM_YYYY + "/" + DD

    let periodRef = db.ref(path)

    await periodRef.once("value", (doc) => {
        if (doc.val()) {
            db.ref(path).update({
                orders: doc.val().orders - 1,
                total: doc.val().total - data.total
            })
        }
    })

    await db.ref('stats/allTime/').once("value", (doc) => {
        if (doc.val()) {
            db.ref('stats/allTime/').update({
                orders: doc.val().orders - 1,
                total: doc.val().total - data.total
            })
        }
    })
})