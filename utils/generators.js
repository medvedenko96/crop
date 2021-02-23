const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const generateHah = (password, salt) => (
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
);

// 86400 expires in 24 hours
const generateJwt = (id, name) => (
  jwt.sign({ id, login: name }, config.JWT_SECRET, { expiresIn: 86400 })
);

const validationPassword = (password, { salt, hash }) => (
  hash === generateHah(password, salt)
);

module.exports = {
  generateSalt,
  generateHah,
  generateJwt,
  validationPassword,
};
