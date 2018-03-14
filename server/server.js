const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./router/index");

// telling application to use express
const app = express();

// - this module lets us send JSON to the server
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = 3000;

//home page test
app.get("/", routes);

// show the accounts
app.get("/accounts", routes);

// show a specific account
app.get("/account/:id", routes);

// create a new account
app.post("/newaccount", routes);

// create a transaction between accounts.
app.post("/transaction", routes);

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app };
