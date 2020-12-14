const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const fetch = require('node-fetch');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

exports.cardToken = functions.https.onCall(async(data) => {
    // console.log(data)
    
    const token = await fetch("https://api.na.bambora.com/scripts/tokenization/tokens", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "number": "4030000010001234",
          "expiry_month": "02",
          "expiry_year": "20",
          "cvd": "123"
        })
      })
        .then(response => response.json())
        .then(data => data)
        .catch((error) => {
          console.error(error);
        });

    return {
        token
    }
})