var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0123456789azerty';


module.exports = class Tools {
  generateTokenForUser(userData) {
    return jwt.sign({
      userId: userData.id
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '10000000h'
    });
  }

  parseAuthorization(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  }

  getUserId(authorization) {
    let userId = -1;
    let token = this.parseAuthorization(authorization);
    if (token != null) {
      //let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
      try {
        let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        userId = jwtToken.userId;
      } catch(err) {
        return -1;
      }
    }
    return userId;
  }
}
