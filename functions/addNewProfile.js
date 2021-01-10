const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

exports.addNewProfile = functions.https.onCall(async (info) => {
  // encode profileCode
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
  let base64data = encode.encode(passcode, 'base64')
  console.log("create profile info::::!!!!!!!!!!!")
  console.log(info)

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
          "name": info.card.name,
          "code": token
        },
        'card': info.card,
        'billing': info.billing,
        'validate ': true
      }
    )
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
  console.log("profile!!!")
  console.log(profile)


  const getProfile = await fetch(`https://api.na.bambora.com/v1//profiles/${profile.customer_code}`, {
    method: 'GET',
    headers: {
      'Authorization': "Passcode " + base64data,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      return data
    })

  console.log("getProfile")
  console.log(getProfile)

  if (getProfile.code !== 1) {
    return { message: "Please check if card or billing address is correct." }
  }

  else {
    return await admin.firestore().collection('users').doc(info.billing.email_address)
      .update({
        profiles: admin.firestore.FieldValue.arrayUnion(getProfile),
        defaultProfileId: getProfile.customer_code
      })
      .then((res) => {
        console.log('res')
        console.log(res)
        return getProfile
      })
  }
})