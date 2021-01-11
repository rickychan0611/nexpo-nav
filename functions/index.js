
const admin = require('firebase-admin');
admin.initializeApp();

const addNewProfile = require('./addNewProfile');
const cardPayment = require('./cardPayment');
const getCards = require('./getCards');
const deleteProfile = require('./deleteProfile');
const refundPayment = require('./refundPayment');
const createQRcode = require('./createQRcode');
const triggerTotalCounter = require('./triggerTotalCounter');

exports.addNewProfile = addNewProfile.addNewProfile;
exports.cardPayment = cardPayment.cardPayment;
exports.getCards = getCards.getCards;
exports.deleteProfile = deleteProfile.deleteProfile;
exports.refundPayment = refundPayment.refundPayment;
exports.createQRcode = createQRcode.createQRcode;
exports.triggerTotalCounter = triggerTotalCounter.triggerTotalCounter;
