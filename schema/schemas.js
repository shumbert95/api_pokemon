const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name:  String,
    type: String,
    level:   String,
    img: String,
    evolution: [{ evolutionLevel: String, evolutionName: String }]
});

const userSchema = new Schema({
    name:  String,
    email:   String,
    password: String,
    pokemonsOwned: [pokemonSchema]
});

module.exports = {
    userSchema,
    pokemonSchema
};
