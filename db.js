const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api_pokemon');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection succeed');
});