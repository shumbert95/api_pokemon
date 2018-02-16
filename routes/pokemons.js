'use strict';
module.exports = function(app) {
    const pokemons = require('../controllers/pokemonController.js');

    app.route('/pokemons')
        .get(pokemons.list_pokemons)
        .post(pokemons.create_pokemon);

    app.route('/pokemons/:id')
        .get(pokemons.show_pokemon)
        .put(pokemons.replace_pokemon)
        .patch(pokemons.change_pokemon)
        .delete(pokemons.delete_pokemon);
};

