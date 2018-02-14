'use strict';
module.exports = function(app) {
    var users = require('../controllers/userController.js');

    app.route('/users')
        .get(users.list_users)
        .post(users.create_user);
};