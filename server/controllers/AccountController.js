const mongoose = require("../db/mongoose.js");
const Account = require("../models/Account");
const Receipt = require("../models/Receipt");

//testing home router
exports.homePage = (req, res) => {
  console.log("hello");
};

// creating a new  account.
// no field for price since we want user to have a default of $100
exports.newAccount = (req, res) => {
  const account = new Account({
    name: req.body.name,
    email: req.body.email
  });

  //saving instance of account
  account.save().then(
    doc => {
      res.send(doc);
    },
    // catching errors.
    e => {
      res.status(400).send(e);
    }
  );
};

// showing all accounts.
exports.showAccounts = (req, res) => {
  Account.find().then(
    account => {
      res.send(account);
    },
    //error handling.
    e => {
      res.status(400).send(e);
    }
  );
};

//showing specific account
exports.showAnAccount = (req, res) => {
  var id = req.params.id;
  // Want to find account by Id's
  Account.find({ _id: id }).then(
    account => {
      res.send(account);
    },
    e => {
      res.status(400).send(e);
    }
  );
};

// Need to find the 2 accounts.
// Adjust the balance in both the accounts.
// Save the transaction.
exports.makeTransaction = (req, res) => {
  // requests from form.
  const seller_id = req.body.seller_id;
  const buyer_id = req.body.buyer_id;
  const amount = req.body.amount;

  Account.findOne({ _id: seller_id }).then(account => {
    account
      .updatePrice(req.body.amount)
      .then(updatePrice => {
        res.send(updatePrice);
      })
      .catch(e => {
        res.status(400).send();
      })
      .then(
        Account.findOne({ _id: buyer_id }).then(account => {
          account.addFunds(req.body.amount).then(moreMoney => {
            res.send(moreMoney);
          });
        })
      )
      .catch(e => {
        res.status(400).send();
      });
  });
};
