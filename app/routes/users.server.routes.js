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

	// First middleware to set a cookie for redirecting
	// to where the user actually wants to go when CAS sends
	// them back to us.
	app.use('/auth/', function(req, res, next){
		if(typeof(req.query.next) === 'string'){
			res.cookie('next', req.query.next, { maxAge: 900000, path: '/auth'});
		}
		next();
	});

	// Actually do the authentication
	app.route('/auth/cas').get(passport.authenticate('cas'));

	// Post-authentication middleware to see if they need to be redirected
	// to a location.
	app.use('/auth/', function(req, res, next){
		if (req.isAuthenticated()) {
			if(typeof(req.cookies.next) === 'string'){
				res.redirect(req.cookies.next);
				res.clearCookie('next', {path: '/auth'})
			}else{
				res.redirect('/');
			}
		};
		next();
	});

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};
