const functions = require('firebase-functions');
const admin = require('firebase-admin');

const base64 = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

exports.cardPayment = functions.https.onCall(async (data) => {
    console.log("cardPayment run")
    let passcode = functions.config().tintin.id + ":" + functions.config().tintin.payment_key

    let base64data = base64.encode(passcode, 'base64')
    const payment = await fetch("https://api.na.bambora.com/v1/payments", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Passcode ' + base64data
      },
      body: JSON.stringify(
        {
          "order_number": data.orderId,
          "amount": data.amount,
          "payment_method": "payment_profile",
          "payment_profile": { 
              "customer_code": data.customer_code,
              "card_id": "1",
              "complete":"true" }
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        console.log("payment response::" , data)  
        return data
    })
      .catch((error) => {
        console.error(error);
      })
    return payment
  })