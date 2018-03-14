const mongoose = require("mongoose");
const axios = require("axios");
const { Schema } = mongoose;

// 1) Needs to hold the list of transactions between accounts.
// 2) Will need to hold the ID's of both the payer and payee
// 3) Each receipt  will need to have a unique ID
// 4) Each receipt will need to display how much was transferred
// 5) Should be a joint table.

const ReceiptSchema = Schema({
  payer: String,
  payee: String,
  amount_transferred: Number
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
