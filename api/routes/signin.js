const db = require('../data/config');
const router = require('express').Router();
const randomString = require('randomstring');
const bcrypt = require('bcrypt');
const toolsModule = require('../data/tools');
let tools = new toolsModule();

router.post('/', function(req, res, next) {
  let pool = db.getPool();

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).json({
      'success': false,
      'details': "email, password and username mandatory"
    });
  } else {
    pool.query('SELECT * FROM Users WHERE Email = ?', req.body.email, (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      if (result.length == 0) {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          pool.query('INSERT INTO Users (UserName, Email, Password) VALUES (?, ?, ?)', [req.body.username, req.body.email, hash], (error, result) => {
            if (error) {
              res.status(400).send(error);
            }
            res.status(200).json({
              'token' : tools.generateTokenForUser(result.insertId),
              'success': true
            });
          });
        });
      } else {
        res.status(400).json({
          'success': false,
          'details': 'User already exist'
        })
      }
    })

  }
});

module.exports = router;
