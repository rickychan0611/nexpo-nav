const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');
const QRCode = require('qrcode')


exports.createQRcode = functions.https.onCall(async (data) => {
  console.log("1111111111111111111111111")
  console.log(data)
  
  const promise = new Promise((resolve, reject)=>{
    QRCode.toDataURL(data.user.email, function (err, url) {
      console.log(url)
      resolve(url) 
    })
  })
  
  return await promise.then((url)=>{
    return url
  })
})