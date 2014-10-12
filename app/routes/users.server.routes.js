'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);

	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting the CAS auth routes
	app.route('/auth/cas').get(passport.authenticate('cas'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
