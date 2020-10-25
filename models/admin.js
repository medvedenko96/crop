const mongoose = require('mongoose');
const generators = require('../utils/generators');

const { generateSalt, generateHah, generateJwt } = generators;
const { Schema } = mongoose;

const adminSchema = new Schema({
    username : String,
    hash: String,
    salt: String,
});

adminSchema.methods.setPassword = function(password) {
    this.salt = generateSalt();
    this.hash = generateHah(password, this.salt);
};

adminSchema.methods.validPassword = function(password) {
    return this.hash === generateHah(password);
};

adminSchema.methods.generateJwt = function () {
    return generateJwt(this._id, this.login)
};

mongoose.model('admins', adminSchema);