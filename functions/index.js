const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

exports.cardToken = functions.https.onCall(async (info) => {
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
    body: JSON.stringify(info.card)
  })
    .then(response => response.json())
    .then(data => {
      console.log("!!!!!!!!!!!!!" + data.token)
      return data.token
    })

  const profile = await fetch("https://api.na.bambora.com/v1/profiles", {
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
        },
        'card': info.card,
        'billing': info.billing
      }
    )
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
  console.log("profile!!!")
  console.log(profile)

  if (profile.code !== 1) {
    return profile
  }
  else {
    return await admin.firestore().collection('users').doc(info.billing.email_address)
      .update({
        defaultProfile: profile.customer_code,
        profileIds: {
          [profile.customer_code]: {
            customer_code: profile.customer_code,
            createAt: new Date(),
          }
        }
      })
      .then((res) => {
        console.log('res')
        console.log(res)
        return profile
      })
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