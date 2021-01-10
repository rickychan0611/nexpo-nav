const functions = require('firebase-functions');
const admin = require('firebase-admin');

const encode = require('nodejs-base64-encode');
const fetch = require('node-fetch');
const { user } = require('firebase-functions/lib/providers/auth');

exports.refundPayment = functions.https.onCall(async (data) => {
  console.log("refund Payment run")
  let passcode = functions.config().tintin.id + ":" + functions.config().tintin.payment_key
  let base64data = encode.encode(passcode, 'base64')

  console.log(data.order)
  console.log(data.order.totalAmt)
  console.log(data.order.paymentData.links[1].href)

  const refund = await fetch(data.order.paymentData.links[1].href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Passcode ' + base64data
      // 'Authorization': 'Passcode Mzc2MjkzMzYxOmYzNjYxNzUyMjQ2MjQzNDQ4QjZEMzI5QjJiRGRCMTND'
    },
    body: JSON.stringify(
      {
        "order number": 10000104,
        "amount": 1.00
      }
    )
  })
    .then(response => response.json())
    .then(data => {
      console.log("REFUND response::", data)
      return data
    })
    .catch((error) => {
      console.error(error);
    })
  return refund
})