
const admin = require('firebase-admin');
admin.initializeApp();

const addNewProfile = require('./addNewProfile');
const cardPayment = require('./cardPayment');
const getCards = require('./getCards');
const deleteProfile = require('./deleteProfile');

exports.addNewProfile = addNewProfile.addNewProfile;
exports.cardPayment = cardPayment.cardPayment;
exports.getCards = getCards.getCards;
exports.deleteProfile = deleteProfile.deleteProfile;
