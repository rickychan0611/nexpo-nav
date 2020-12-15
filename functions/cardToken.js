const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

exports.cardToken = functions.https.onCall(async (info) => {
  // encode profileCode
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
  let base64data = encode.encode(passcode, 'base64')

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
        profileId: profile.customer_code
      })
      .then((res) => {
        console.log('res')
        console.log(res)
        return profile
      })
  }
})