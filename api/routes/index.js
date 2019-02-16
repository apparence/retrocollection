/*
  file with all route
*/

const router = require('express').Router();

router.use('/signin', require('./signin'));
router.use('/login', require('./login'));
router.use('/user', require('./user'));

module.exports = router;
