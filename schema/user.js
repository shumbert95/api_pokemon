var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name:  String,
    email:   String,
    password: String,
    pokemonsOwned: [{ type: Schema.Types.ObjectId, ref:'Pokemon' }]
});

module.exports = mongoose.model('User', userSchema);


