
const admin = require('firebase-admin');
admin.initializeApp();

const cardToken = require('./cardToken');
const cardPayment = require('./cardPayment');
const getCards = require('./getCards');

exports.cardToken = cardToken.cardToken;
exports.cardPayment = cardPayment.cardPayment;
exports.getCards = getCards.getCards;