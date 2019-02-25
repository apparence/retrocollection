const db = require('../data/config');
const router = require('express').Router();

var toolsModule = require('../data/tools');
let tools = new toolsModule();

router.get('/', function(req, res, next) {
  let pool = db.getPool();

  if (tools.getUserId(req.headers['authorization']) == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }

  if (!pool) {
    res.status(500).json({
      'sucess': false,
      'details': 'Error in pool'
    })
    return;
  }

  pool.query("SELECT * FROM Constructors", (error, result) => {
    if (error) {
      res.status(400).json({
        'sucess': false,
        'details': error
      });
      return;
    }

    res.status(200).json({
      'success': true,
      'constructor': result
    });
  })
})

router.get('/:id', function(req, res, next) {
  let pool = db.getPool();

  if (tools.getUserId(req.headers['authorization']) == -1) {
    res.status(400).json({
      'success': true,
      'details': 'Bad token'
    });
    return;
  }

    if (!pool) {
      res.status(500).json({
        'success': false,
        'details': 'Error in pool'
      });
      return;
    }

    pool.query("SELECT * FROM Constructors WHERE ConstructorID = ?", req.params.id, (error, result) => {
      if (error) {
        res.status(400).json({
          'success': false,
          'details': error
        })
        return;
      }
      res.status(200).json({
        'success': true,
        'constructor': result
      });
    })
})

router.post('/', function(req, res, next) {
  let pool = db.getPool();

  if (tools.getUserId(req.headers['authorization']) == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return ;
  }

  if (!pool) {
    res.status(500).json({
      'success':false,
      'details': 'Error in pool'
    });
    return;
  }
  if (!req.body.constructorname) {
    res.status(400).json({
      'success': false,
      'details': "Constructor name mandatory"
    });
    return;
  }
  var sql = "INSERT INTO Constructors (ConstructorName";
  var sql1 = "VALUES (?";
  var bindings = [];
  bindings.push(req.body.constructorname);

  if (req.body.creationdate) {
    sql += ", CreationDate";
    sql1 += ", ?";
    bindings.push(req.body.creationdate);
  }

  if (req.body.website) {
    sql += ", Website";
    sql1 += ", ? ";
    bindings.push(req.body.website);
  }

  pool.query(sql + ")" + sql1 + ")", bindings, (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
      return;
    }
    res.status(200).json({
      'success': true,
      'details': 'Constructor Insert'
    });
  })
})


router.put('/:id', function(res, req, next) {
  let pool = db.getPool();

  if (tools.getUserId(req.headers['authorization']) == -1) {
    res.status(400).json({
      'success': false,
      'details': 'Bad token'
    });
    return;
  }
  if (!pool) {
    res.status(500).json({
      'success': false,
      'details': 'Error in pool'
    })
  }
  if (!req.body.consolename) {
    res.status(400).json({
      'success':false,
      'details': 'constructor name mandatory'
    })
  }
  pool.query("SELECT * FROM Constructor WHERE ConstructorID = ?", req.params.id, (error, result) => {
    if (error) {
      res.status(400).json({
        'success': false,
        'details': error
      });
    }
    if (result.length == 0) {
      res.status(400).json({
        'success': false,
        'details': "Id not ok"
      });
      return;
    }
    var sql = "UPDATE Constructor SET ConstructorName = ?";
    var bindings = [req.body.constructorname];

    if (req.body.creationdate) {
      sql += ", CreationDate = ?";
      bindings.push(req.body.creationdate);
    }

    if (req.body.website) {
      sql += ", Website = ?";
      bindings.push(req.body.website);
    }
    sql += " WHERE ConstructorID = ?";
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
        'details': 'Constructor UPDATE'
      });
    })
  })

})

module.exports = router
