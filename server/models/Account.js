const mongoose = require("mongoose");
const axios = require("axios");
// used to create relationship top receipt
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;

// 1) schema for Account model. MongoDB and mongoose will handle creating the ID so do not need to
// specific in Schema.
// 2) Balance should probably not be stored as number, but due to time constraints will store in dollars.
// 3) Need to store the balance as AUD. Default as AUD and then call to API to change req.body depending on currency.
// 4) Session_id seems useful to store - could put in local storage?
const AccountSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 100
  },
  session_id: {
    type: String
  },
  receipt: [{ type: ObjectId, ref: "Receipt" }]
});

// method to subtract balance from paying account
AccountSchema.methods.updatePrice = function(amount) {
  var account = this;
  // if balance is less than the amount, payment will not go through.
  if (account.balance > amount) {
    const newAmount = account.balance - amount;
    return account.update({ $set: { balance: newAmount } });
  } else {
    return console.log("error");
  }
};

//method to add balance from another account.
AccountSchema.methods.addFunds = function(amount) {
  var account = this;
  const newAmount = account.balance + amount;
  console.log("buyer", newAmount);
  return account.update({ $set: { balance: newAmount } });
};

module.exports = mongoose.model("Account", AccountSchema);

// making an async request to API to convert to AUD.
const url =
  "https://www.divipay.com/secure/currency/AUD/";

const getLocation = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    foreignRate = data.rate
    return foreignRate
  } catch (error) {
    console.log(error);
  }
};

getLocation(url)
// getLocation(url).then(res => {
//   AccountSchema.path("balance.type").set(function(num) {
//     return num * res;
//   });
// });
