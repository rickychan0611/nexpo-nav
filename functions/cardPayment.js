const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

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