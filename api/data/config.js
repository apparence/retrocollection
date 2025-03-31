const mysql = require('mysql');
let pool = null;

exports.connect = function(done) {
  pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'RetroCollection',
    port: 3306
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
