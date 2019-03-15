const db = require('../data/config');
const router = require('express').Router();

var toolsModule = require('../data/tools');
let tools = new toolsModule();

router.get('/', function(req, res, next) {
  let pool = db.getPool();
  let userid = tools.getUserId(req.headers['authorization']);

  if (userid == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }

  pool.query("SELECT * FROM Editors", (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
      return;
    }
    res.status(200).json({
      'success': true,
      'editors': result
    });
  })
})

router.get("/:id", function(res, req, next) {
  let pool = db.getPool();
  let userid = tools.getUserId(req.headers['authorization']);

  if (userid == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }

  pool.query("SELECT * FROM Editors WHERE EditorID = ?", req.params.id, (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
      return;
    }

    res.status(200).json({
      'sucess': true,
      'editor': result
    });
  })
})

router.post("/", function(req, res, next) {
  let pool = db.getPool();
  let userid = tools.getUserId(req.headers['authorization']);

  if (userid == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }
})

module.exports = router
