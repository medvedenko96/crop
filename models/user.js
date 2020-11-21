const mongoose = require('mongoose');
const generators = require('../utils/generators');

const { generateSalt, generateHah, generateJwt } = generators;
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  companyName: String,
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function (password) {
  this.salt = generateSalt();
  this.hash = generateHah(password, this.salt);
};

userSchema.methods.validPassword = function (password) {
  return this.hash === generateHah(password, this.salt);
};

userSchema.methods.generateJwt = function () {
  return generateJwt(this._id, this.login);
};

mongoose.model('users', userSchema);
