'use strict';

var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		console.log('in serializeUser');
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		console.log('in deserializeUser');
		User.findOne({
			_id: id
		}, '-salt -password', function(err, user) {
			console.log('--------', user);
			done(err, user);
		});
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};