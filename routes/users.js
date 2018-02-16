'use strict';
module.exports = function(app) {
    const users = require('../controllers/userController.js');

    app.route('/login')
        .post(users.login);

    app.route('/users')
        .get(users.list_users)
        .post(users.create_user);

    app.route('/users/pokemons')
        .get(users.login_required, users.list_user_pokemons)
        .delete(users.login_required, users.remove_pokemon)
        .post(users.login_required, users.add_pokemon);

    app.route('/users/pokemons/:id')
        .get(users.login_required, users.get_pokemon_infos);
};