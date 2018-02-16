const mongoose = require('mongoose');
const User = require('../schema/user.js');
const Pokemon = require('../schema/pokemon.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config.js');
const in_array = require('in_array');
const url = require('url');

exports.login = function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!req.body.password)
                res.status(400).json({ message: 'Authentication failed. Missing password.' });
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({token: jwt.sign({ email: user.email, name: user.name, _id: user._id, pokemonsOwned: user.pokemonsOwned}, config.secret)});
            }
        }
    });
};

exports.login_required = function(req, res, next){
    const user = me(req);
    if (user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).select({ name: 1, email: 1, pokemonsOwned: 1});
};

exports.create_user = function(req, res) {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.list_user_pokemons = function(req, res) {
    const user = me(req);
    User.findOne({_id: user._id}, function(err, user) {
        Pokemon.find({}, function(err, pokemon) {
            if (err)
                res.send(err);
            res.json(pokemon);
        }).where('_id').in(user.pokemonsOwned);
    });
};

exports.add_pokemon = function(req, res) {
    const user = me(req);
    User.findOne({_id: user._id}, function(err, user) {
        Pokemon.findOne({_id: req.body.pokemonId}, function(err, pokemon) {
            if (err)
                res.send(err);
            if (!pokemon) {
                return res.status(401).send({
                    message: "Unknown pokemon."
                });
            } else {
                let added = user.pokemonsOwned.addToSet(pokemon).length;
                if (added) {
                    user.save(function(err, user) {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            });
                        }
                    });
                }
            }
            return res.json(user);
        });
    });
};

exports.remove_pokemon = function (req, res) {
    const user = me(req);
    User.findOne({_id: user._id}, function(err, user) {
            if (err)
                res.send(err);
            for (let [key, pokemonOwned] of user.pokemonsOwned.entries()) {
                if (pokemonOwned._id.toString() === req.body.pokemonId.toString()) {
                    delete user.pokemonsOwned[key];
                }
            }

            return res.json(user);
    });
};

exports.get_pokemon_infos = function(req, res) {
    const user = me(req);
    User.findOne({_id: user._id}, function(err, user) {
        if (err)
            res.send(err);
        if (user.pokemonsOwned.length > 0) {
            console.log(user.pokemonsOwned);
            for (let [key, pokemonOwned] of user.pokemonsOwned.entries()) {
                if (pokemonOwned._id.toString() === req.params.id.toString()) {
                    return res.json(pokemonOwned);
                }
            }
            return res.status(200).send({
                message: "You don't have this pokemon."
            });
        } else {
            return res.status(200).send({
                message: "You don't have any pokemon."
            });
        }

    });
};

function me (req){
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.replace(/^JWT\s/, ''),
            decoded;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            return null;
        }
        return decoded;
    }
    return null;
}