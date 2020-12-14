const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection('messages').add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

exports.cardToken = functions.https.onCall(async (data) => {
  try {
    // encode profileCode
    let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
    let base64data = encode.encode(passcode, 'base64')
    console.log("base64data:: ")
    console.log(base64data)

    const token = await fetch("https://api.na.bambora.com/scripts/tokenization/tokens", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("!!!!!!!!!!!!!" +data.token)
        return data.token
      })
      .catch((error) => {
        console.error(error);
        // throw new HttpsError("unauthenticated", "Get token Error:"+ err);
      });


    const profileToken = await fetch("https://api.na.bambora.com/v1/profiles", {
      method: 'POST',
      headers: {
        'Authorization': "Passcode " + base64data,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "token": {
            "name": "John Doe",
            "code": token
          }
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data
      })
      .catch((error) => {
        console.error("profile error" + error);
        // throw new HttpsError("unauthenticated", "Save Profile Error:"+ err);
      });

      return {
        profileToken
      }

    } catch(err) {
      console.log(err)
    }
})

exports.cardPayment = functions.https.onCall(async (cardData) => {

  let passcode = functions.config().tintin.id + { token }
  let base64data = encode.encode(passcode, 'base64')

  console.log(base64data)

  const payment = await fetch("https://api.na.bambora.com/v1/payments", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Passcode ' + base64data
    },
    body: JSON.stringify(
      {
        "order_number": "005",
        "amount": 1.00,
        "payment_method": "card",
        "card": cardData,
        "billing": {
          "email_address": "ric0611@gmail.com"
        }
      }
    )
  })
    .then(response => response.json())
    .then(data => data)
    .catch((error) => {
      console.error(error);
    })
  return {
    token
  }
})