/*
  file with all route
*/

const router = require('express').Router();

router.use('/subscribe', require('./subscribe'));

module.exports = router;
