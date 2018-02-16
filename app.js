var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Models
var Pokemon = require('./schema/pokemon');
var User = require('./schema/user');

//Routes
var userRoutes = require('./routes/users');
var pokemonRoutes = require('./routes/pokemons');
var index = require('./routes/index');


var config = require('./config.js');

require('./db.js');

var app = express();
var port = process.env.PORT || 3000;

app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


userRoutes(app);
pokemonRoutes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});