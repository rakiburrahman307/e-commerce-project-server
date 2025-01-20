const jwt = require('jsonwebtoken');
const createToken = (jwtPayload, secret, expiresIn) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
module.exports = createToken;