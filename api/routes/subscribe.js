
const db = require('../data/config');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.post('/', function(req, res, next) {
  let pool = db.getPool();
  let values = null;

  if (!pool) {
    res.status(500).send('Something wrong');
  } else if (!req.body.email) {
    res.status(400).send("Please put a mail");
  } else {
    //ici rentrer dans a base les infos de l'utilisateur et le token et ensuite lui renvoyé le token
    res.status(200).send(req.body.email);
  }
});

module.exports = router;
