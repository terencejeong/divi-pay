const mongoose = require("../db/mongoose.js");
const Account = require("../models/Account");
const Receipt = require("../models/Receipt");

// Need to generate a receipt when there is a transaction.
//Need to take the body from transaction endpoint and then store it with appropriate relationship.

//Creating a new receipt
exports.newReceipt = (req, res) => {
  console.log(res.body);
  const receipt = new Receipt({
    payer: req.body.seller_id,
    payee: req.body.buyer_id,
    amount_transferred: req.body.amount
  });
  receipt.save().then(doc => {
    return Account.findOne({ _id: req.body.seller_id }).then(u => {
      u.receipt.push({ _id: invoice._id });
    });
  });
};
