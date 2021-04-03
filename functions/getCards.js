const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

exports.getCards = functions.https.onCall(async (data) => {

  // encode profileCode
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.profile_code
  let base64data = encode.encode(passcode, 'base64')

  let profiles = []
  profiles = await Promise.all(
    data.profiles.map((profile, index) => {
      return fetch(`https://api.na.bambora.com/v1//profiles/${profile.customer_code}`, {
        method: 'GET',
        headers: {
          'Authorization': "Passcode " + base64data,
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            return data
          }
          else return undefined
        })
    })
  )

  if (profiles) {
    const filteredProfiles = profiles.filter(function (el) {
      return el !== undefined;
    });

    let checkDefaultId = filteredProfiles[0] && filteredProfiles.map((profile, index) => {
      if (profile.customer_code === data.defaultProfileId) {
        return index
      }
      else return -1
    })

    if (checkDefaultId === -1 && data.defaultProfileId) {
      admin.firestore().collection('users').doc(data.email)
        .update({
          defaultProfileId: profiles[0].customer_code,
          profiles: filteredProfiles
        })
        .then(() => {
          return
        })
    }
    else if (checkDefaultId !== -1) {
      admin.firestore().collection('users').doc(data.email)
        .update({
          // defaultProfileId: profiles[checkDefaultId].customer_code,
          profiles: filteredProfiles
        })
        .then(() => {
          return
        })
    }
  }
  return profiles
})
