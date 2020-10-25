const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports.generateSalt = () => crypto.randomBytes(16).toString('hex');

module.exports.generateHah = (password, salt) =>
    crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

module.exports.generateJwt = (id, login) =>
    jwt.sign({ _id: id, login }, keys.jwt_secret);
