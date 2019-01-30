/*
  file with all route
*/

const router = require('express').Router();

router.use('/subscribe', require('./subscribe'));

module.exports = router;


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
