const express = require("express");
const accountController = require("../controllers/AccountController");
const receiptController = require("../controllers/ReceiptController");

const router = express.Router();

router.get("/", accountController.homePage);

// showing all accounts
router.get("/accounts", accountController.showAccounts);
// end point for posting accounts.
router.post("/newaccount", accountController.newAccount);
// making transactions with accounts.
router.post("/transaction", accountController.makeTransaction, receiptController.newReceipt);
// show account with id
router.get("/account/:id", accountController.showAnAccount);
module.exports = router;
