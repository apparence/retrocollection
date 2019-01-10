/*
bcrypt.hash('myPassword', 10, function(err, hash) {
  // Store hash in database
});
To verify the password later on:

bcrypt.compare('somePassword', hash, function(err, res) {
  if(res) {
   // Passwords match
  } else {
   // Passwords don't match
  }
});*/

const pool = require('../data/config');
const bodyParser = require('body-parser');

const login = app => {
  app.use(bodyParser.urlencoded({extended: false}));

  app.post("/login", (request, response) => {
    
  })
}
