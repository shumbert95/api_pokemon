var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    name:  String,
    email:   String,
    password: String,
    pokemonsOwned: [{ type: Schema.Types.ObjectId, ref:'Pokemon' }]
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', userSchema);


