const mysql = require('mysql');
let pool = null;

exports.connect = function(done) {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'RetroCollection'
  });
  if (!pool) {
    done(new Error('Cannot connect to database'));
  } else {
    done();
  }
}

exports.getPool = function() {
  return pool;
}
