var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Pokemon = require('../schema/pokemon.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    Pokemon.find(function(err, pokemons) {
        if (err) {
            throw err;
        }
        res.render('index', {
            'pokemons': pokemons,
            title: 'Liste des pokemons'
        });
    });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
