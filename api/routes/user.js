const db = require('../data/config');
const bcrypt = require('bcrypt');
const router = require('express').Router();
var toolsModule = require('../data/tools');
let tools = new toolsModule();

router.get('/', function(req, res, next){
  let pool = db.getPool();
  let userId = tools.getUserId(req.headers['authorization']);

  if (userId == -1) {
    res.status(400).json({
      'success': false,
      'details': 'bad token'
    });
    return;
  }

  pool.query("SELECT UserName, FirstName, LastName, Email, PictureURL FROM Users", (error, result) => {
    if (error) {
      res.status(400).send(error);
    }
    res.status(200).json({
      'success': true,
      'users': result
    });
  })
})

router.get('/:id', function(req, res, next) {
  let pool = db.getPool();
  let userId = tools.getUserId(req.headers['authorization']);

  if (userId == -1) {
    res.status(400).json({
      'success': 'false',
      'error': 'bad token'
    });
    return;
  }

  if (!pool) {
    res.status(500).send("Something Wrong");
  } else {
    let id = req.params.id;
    pool.query("SELECT * FROM Users WHERE UserID = ?", id, (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      if (result.length == 0) {
        res.status(400).json({
          'success': false,
          'details': 'User not found'
        })
      } else {
      res.status(200).json({
        'success': 'true',
        'user': result
      });
    }
    })
  }
})

//// TODO: finir le put ici
router.put('/:id', function(req, res, next) {
  let pool = db.getPool();
  let userId = tools.getUserId(req.headers['authorization']);

  if (userId == -1) {
    res.status(400).json({
      'success': false,
      'error': 'Bad token'
    });
    return;
  }
})

router.delete('/', function(req, res, next) {
  let pool = db.getPool();
  let userId = tools.getUserId(req.headers['authorization']);
  if (userId == -1) {
    res.status.json({
      'success': false,
      'error': 'Bad token'
    });
    return
  }
  pool.query("DELETE FROM Users WHERE UserID = ?", userId, (error, result) => {
    if (error) {
      res.status(400).send(error)
    }
    res.status(200).json({
      'success': true,
      'details': 'Goodbye'
    });
  });
})
module.exports = router
