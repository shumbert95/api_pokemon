var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    name:  String,
    type: String,
    level:   String,
    img: String,
    evolution: [{ evolutionLevel: String, evolutionName: String }]
});

module.exports = mongoose.model('Pokemon', pokemonSchema);


