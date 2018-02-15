var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Models
var Pokemon = require('./schema/pokemon');
var User = require('./schema/user');

//Routes
var userRoutes = require('./routes/users');
var pokemonRoutes = require('./routes/pokemons');

require('./db.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);
pokemonRoutes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});