const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemas = require('./schemas.js');


schemas.userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', schemas.userSchema);


