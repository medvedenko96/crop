const mongoose = require('mongoose');
const generators = require('../utils/generators');

const { generateSalt, generateHah, generateJwt } = generators;
const { Schema } = mongoose;

const companySchema = new Schema({
  companyName: String,
  hash: String,
  salt: String,
});

companySchema.methods.setPassword = function (password) {
  this.salt = generateSalt();
  this.hash = generateHah(password, this.salt);
};

companySchema.methods.validPassword = function (password) {
  return this.hash === generateHah(password, this.salt);
};

companySchema.methods.generateJwt = function () {
  return generateJwt(this._id, this.login);
};

mongoose.model('companies', companySchema);
