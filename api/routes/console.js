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
    })
    return;
  }

  pool.query("SELECT * FROM Consoles", (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
      return;
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
    if (!pool) {
      res.status(500).send('Something wrong');
    } else if (!req.body.consolename) {
      res.status(400).send("missing consolename in body");
    } else {
      var sql = "INSERT INTO Consoles (ConsoleName ";
      var sql1 = "VALUES ( ? ";
      var bindings = [];
      bindings.push(req.body.consolename);

      if (req.body.releasedate) {
        sql += ", ReleaseDate";
        sql1 += ", ?";
        bindings.push(req.body.releasedate);
      }

      if (req.body.id) {
        pool.query("SELECT * FROM Constructor WHERE ConstructorID = ?", res.body.constructorid, (error, result) => {
          if (error) {
            res.status(400).json({
              'sucess': false,
              'details': error
            })
            return;
          }
          sql += ", ConstructorID";
          sql1 += ", ?";
          bindings.push(req.body.constructorid);
        });
      }
      sql += ")";
      sql1 += ")";
      pool.query(sql + sql1, bindings, (error, result) => {
        if (error) {
          res.status(400).json({
            'success': false,
            'details': error
          });
          return;
        }
        res.status(200).json({
          'success': true,
          'details': result
        });
      })
    }
})

router.put("/:id", function(req, res, next) {
  let pool = db.getPool();

  if (tools.getUserId(res.headers['authorization']) == -1) {
    res.status(400).json({
      'sucess': false,
      'details': 'Bad token'
    });
    return;
  }

  if (!pool) {
    res.status(500).json({
      'success': false,
      'detail': 'Error in pool'
    });
    return;
  }

  if (!req.body.consolename) {
    res.status(400).json({
      'success': false,
      'details': 'console name mandatory'
    });
    return;
  }

  pool.query("SELECT * FROM Consoles WHERE ConsoleID = ?", req.params.id, ( error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
      return;
    }

    if (result.length == 0) {
      res.status(400).json({
        'success': false,
        'details' : 'Id not ok'
      });
      return;
    }
    var sql = "UDPATE Consoles SET ConsoleName = ?";
    var bindings = [req.body.consolename];

    if (req.body.releasedate) {
      sql += ", ReleaseDate = ?";
      bindings.push(req.body.releasedate);
    }

    if (req.body.constructorid) {
        pool.query("SELECT * FROM Constructor WHERE ConstructorID = ?", req.body.constructorid, (error, result) => {
          if (error) {
            res.status(400).json({
              'success': false,
              'details': error
            });
            return;
          }

          if (result.length == 0) {
            res.status(400).json({
              'success' : false,
              'details': 'Constructor not here'
            });
            return;
          }

          sql += ", ConstructorID = ?";
          bindings.push(req.body.constructorid);
        })
    }

    sql += " WHERE ConsoleID = ?";
    bindings.push(req.params.id);
    pool.query(sql, bindings, (error, result) => {
      if (error) {
        res.status(400).json({
          'success': false,
          'details': error
        });
        return;
      }
      res.status(200).json({
        'success': true,
        'details': 'Console update'
      });
    })
  })
})

module.exports = router
