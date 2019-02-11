/*
  file with all route
*/

const router = require('express').Router();

router.use('/subscribe', require('./subscribe'));
router.use('/login', require('./login'));
router.use('/user', require('./user'));

module.exports = router;
