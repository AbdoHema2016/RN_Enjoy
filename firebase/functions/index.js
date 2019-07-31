const functions = require("firebase-functions");
const createUser = require("./create_user")
const admin = require("firebase-admin");
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.helloWorld = functions.https.onRequest((request, response) => {
      response.send("Hello from Firebase!");
 });

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://enjoy-510df.firebaseio.com"
  });

exports.createUser = functions.https.onRequest(createUser)
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword)