
const db = require('../data/config');
const router = require('express').Router();
const randomString = require('randomstring');
const bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  let pool = db.getPool();

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email) {
    res.status(400).send("Please put a mail");
  } else {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      let token = randomString.generate();
      pool.query('INSERT INTO Users (UserName, Email, Password, Token) VALUES (?, ?, ?, ?)', [req.body.username, req.body.email, hash, token], (error, result) => {
        if (error) {
          res.status(400).send(error);
        }
        var response = {
          token: token,
          success: true,
          details: 'OK'
        };
        res.status(200).send(response);
      });
    });
  }
});

module.exports = router;
