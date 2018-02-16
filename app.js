const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Models
const Pokemon = require('./schema/pokemon');
const User = require('./schema/user');

//Routes
const userRoutes = require('./routes/users');
const pokemonRoutes = require('./routes/pokemons');
const index = require('./routes/index');

const config = require('./config.js');

require('./db.js');

const app = express();
const port = process.env.PORT || 3000;

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