const mongoose = require('mongoose');
const schemas = require('./schemas.js');

module.exports = mongoose.model('Pokemon', schemas.pokemonSchema);


