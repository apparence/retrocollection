const db = require('../data/config');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.get('/:id', function(req, res, next) {
  let pool = db.getPool();

  if (!pool) {
    res.status(500).send("Something Wrong");
  } else {

    let id = req.params.id;
    pool.query("SELECT * FROM Users WHERE UserID = ?", id, (error, result) => {
      if (error) {
        res.status(400).send(error);
      }
      var response = {
        success: true,
        details: 'ok',
        user: result,
        header: res.headers
      }
      res.status(200).send(response);
    })
  }
})

module.exports = router
