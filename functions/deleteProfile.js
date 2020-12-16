const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

//API URL: https://us-central1-tintin-store.cloudfunctions.net/
//LOCAL: http://localhost:5001/tintin-store/us-central1/

exports.deleteProfile = functions.https.onCall(async (info) => {
  // encode profileCode
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
  let base64data = encode.encode(passcode, 'base64')
  console.log("info")
  console.log("info")
  console.log(info)
  const profile = await fetch(`https://api.na.bambora.com/v1/profiles/${info.profileId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': "Passcode " + base64data,
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data
    })

    return profile
  // if (profile.code !== 1) {
  //   return profile
  // }
  // else {
  //   return await admin.firestore().collection('users').doc(info.email)
  //     .update({
  //       profileId: admin.firestore.FieldValue.arrayRemove(info.profileId),
  //     })
  //     .then((res) => {
  //       console.log('res')
  //       console.log(res)
  //       return profile
  //     })
  // }
})