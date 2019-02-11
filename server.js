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

/*getUserId(authorization) {
        let userId = -1;
        let token = this.parseAuthorization(authorization);
        if (token != null) {

            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                userId = jwtToken.userId;
            } catch(err) {
                return -1;
              }
        }
        return userId;
    }
    var jwt = require('jsonwebtoken');

    const JWT_SIGN_SECRET = '0123456789azerty';

        generateTokenForUser(userData) {
            return jwt.sign({
                userId: userData.id
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            });
        }

        parseAuthorization(authorization) {
            return (authorization != null) ? authorization.replace('Bearer ', '') : null;
        }
    */
