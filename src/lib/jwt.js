const jsonwebtoken = require('jsonwebtoken');
const { promisify } = require('util');

// 13. Generate jwt
const jwt = {
  sign: promisify(jsonwebtoken.sign),
  verify: promisify(jsonwebtoken.verify),
};

module.exports = jwt;