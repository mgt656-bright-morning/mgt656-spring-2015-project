'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({
	netid: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a netid',
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	firstName: {
		type: String,
		trim: true,
		default: '',
	},
	lastName: {
		type: String,
		trim: true,
		default: '',
	},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	// if (this.password && this.password.length > 6) {
	// 	this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	// 	this.password = this.hashPassword(this.password);
	// }

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	// return this.password === this.hashPassword(password);
	return true;
};


mongoose.model('User', UserSchema);