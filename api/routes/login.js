const db = require('../data/config');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const randomString = require('randomstring');

router.post('/', function(req, res, next) {
  let pool = db.getPool();

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email || !req.body.password) {
    res.status(400).send("Body emprty");
  } else {
    pool.query('SELECT Email, Password FROM Users WHERE Email = ?', req.body.email, (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      if (result.length == 0) {
        res.status(400).send("User not found");
      } else if (result[0].Email.toString().trim() == req.body.email) {
        bcrypt.compare(req.body.password, result[0].Password, function(err, isOK) {
          if (isOK) {
            let token = randomString.generate();
            pool.query('UPDATE Users SET Token = ? WHERE Email = ?', [token, req.body.email], (error, result) => {
              if (error) {
                res.status(400).send("Something went wrong");
              }
              var response = {
                succes: true,
                detail: 'Login ok',
                token: token
              };
              res.status(200).send(response);
            });
          } else {
            res.status(400).send("Password do not match");
          }
        });
      } else {
        res.status(400).send("Email not ok");
      }
    })
  }
})

module.exports = router;
