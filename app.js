const express = require('express');
const routes = require('./api/routes/routes');
const port = 3002;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

const server = app.listen(port, (error) => {
  if (error) {
    return console.log(`Error ${error}`);
  }

  console.log("serveur ok ");
})
