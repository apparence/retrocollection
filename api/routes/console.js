const db = require('../data/config');
const router = require('express').Router();
const toolsModule = require('../data/tools');
let tools = new toolsModule();

router.get("/", function(res, req, next){
  let pool = db.getPool();
  let userid = tools.getUserId(req.headers['authorization']);

  if (userid == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }

  pool.query("SELECT * FROM Consoles", (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
    }
    res.status(200).json({
      'success': true,
      'consoles': result
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
  pool.query("SELECT * FROM Consoles WHERE ConsoleID = ?", req.params.id, (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
    }

    res.status(200).json({
      'success': true,
      'console': result
    });
  })
})

module.exports = router;
