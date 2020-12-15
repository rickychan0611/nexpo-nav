const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

exports.getCards = functions.https.onCall(async (data) => {

  // encode profileCode
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
  let base64data = encode.encode(passcode, 'base64')

  console.log(data)
  
  return fetch(`https://api.na.bambora.com/v1//profiles/${data.profileId}/cards`, {
    method: 'GET',
    headers: {
      'Authorization': "Passcode " + base64data,
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("card!!!!")
      console.log(data)
      return data
    })
})
