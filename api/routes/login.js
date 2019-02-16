const db = require('../data/config');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const toolsModule = require('../data/tools');
let tools = new toolsModule();

router.post('/', function(req, res, next) {
  let pool = db.getPool();

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email || !req.body.password) {
    res.status(400).send("Body emprty");
  } else {
    pool.query('SELECT * FROM Users WHERE Email = ?', req.body.email, (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      if (result.length == 0) {
        res.status(400).send("User not found");
      } else if (result[0].Email.toString().trim() == req.body.email) {
        bcrypt.compare(req.body.password, result[0].Password, function(err, isOK) {
          if (isOK) {
              res.status(200).json({
                'success': true,
                'token': tools.generateTokenForUser(result[0])
              });
            } else {
            res.status(400).json({
              'success': false,
              'details': 'password does not match'
            })
          }
        });
      } else {
        res.status(400).json({
          'success': false,
          'details': 'wrong email'
        })
      }
    })
  }
})

module.exports = router;
