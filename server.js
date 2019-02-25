const express = require('express');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();
const db = require('./api/data/config');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use(require('./api'));

app.use(function(req, res, next) {
  res.status(404).send('Not found');
})

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to database');
    process.exit(1);
  }
  console.log('you are new connected');
})

const server = app.listen(port, (error) => {
  if (error) {
    return console.log(`Error ${error}`);
  }

  console.log("serveur ok ");
})
