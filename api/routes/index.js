/*
  file with all route
*/

const router = require('express').Router();

router.use('/signin', require('./signin'));
router.use('/login', require('./login'));
router.use('/user', require('./user'));
router.use('/console', require('./console'));
router.use('/constructor', require('./constructor'));
router.use('/editor', require('./editor'));

module.exports = router;
