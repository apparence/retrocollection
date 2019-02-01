/*
  file with all route
*/

const router = require('express').Router();

router.use('/subscribe', require('./subscribe'));
router.use('/login', require('./login'));

module.exports = router;
