/*
bcrypt.hash('myPassword', 10, function(err, hash) {
  // Store hash in database
});
To verify the password later on:

bcrypt.compare('somePassword', hash, function(err, res) {
  if(res) {
   // Passwords match
  } else {
   // Passwords don't match
  }
});*/

const db = require('../data/config');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.post('/', function(req, res, next) {
  let pool = db.getPool();
  let values = null;

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email) {
    res.status(400).send("Please put a mail");
  } else {
    res.status(200).send(req.body.email);
  }
});

module.exports = router;
