const twilio = require('twilio')
const accountSid = "ACa72f6973ca7538a791e605591e79c366"
const authToken = "2037bb130a6458993c2bc678435638ec"

module.exports = new twilio.Twilio(accountSid,authToken)