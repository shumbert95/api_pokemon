var mongoose = require('mongoose');
var Pokemon = require('../schema/pokemon.js');

exports.list_pokemons = function(req, res) {
    Pokemon.find({}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    }).select({ name: 1, type: 1, level: 1, img: 1, evolution: 1});
};

exports.create_pokemon = function(req, res) {
    var new_pokemon = new Pokemon(req.body);
    new_pokemon.save(function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

exports.delete_pokemon = function(req, res) {
    Pokemon.remove({_id: req.params.id}, function (err) {
        if (err)
            res.send(err);
        res.send("Pokemon " + req.params.id + " supprimé")
    });
};

exports.show_pokemon = function(req, res) {
    Pokemon.find({_id: req.params.id}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    }).select({ name: 1, type: 1, email: 1});
};

exports.replace_pokemon = function(req, res) {
    Pokemon.update({_id: req.params.id},req.body,{overwrite : true}, function(err, pokemon) {
        if (err) return handleError(err);
        pokemon = req.body;
        res.json(pokemon);
    });
};

exports.change_pokemon = function(req, res) {
    Pokemon.findById(req.params.id,{ overwrite : true }, function (err, pokemon) {
        if (err) return handleError(err);
        if(req.body.name)
            pokemon.name = req.body.name;
        if(req.body.type)
            pokemon.type = req.body.type;
        if(req.body.level)
            pokemon.level = req.body.level;
        if(req.body.img)
            pokemon.img = req.body.img;
        if(req.body.evolution)
            pokemon.evolution = req.body.evolution;

        pokemon.save(function(err) {
            if (err) { return next(err); }
            res.json(pokemon);
        });

    });
};