var mongoose = require('mongoose');
var User = require('../schema/user.js');

exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    }).select({ name: 1, email: 1, pokemonsOwned: 1});
};

exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};