'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
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
	},
	// Mixed type field that will hold the submissions
	// for various assignments.
	// http://mongoosejs.com/docs/schematypes.html#mixed
	assignments: {},
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

/**
* Create the admin users
*/
UserSchema.statics.addAdmins = function(){
	var _dis = this;
	var adminUserJsonFixture = process.env.ADMIN_USERS;
	if (!adminUserJsonFixture) {
		return false;
	}
	var adminUsers = JSON.parse(adminUserJsonFixture);
	_dis
		.where('netid')
		.in(_.pluck(adminUsers, 'netid'))
		.exec(function(err, records){
			var foundNetids = _.pluck(records, 'netid');
			var missingUsers = _.filter(adminUsers, function(user){
				return !_.contains(foundNetids, user.netid);
			});
			_dis.collection.insert(missingUsers, function(err, users){
				var numInserted = 0;
				if (!_.isNull(users)) {
					numInserted = users.length;
				}
				console.log('Inserted ', numInserted, ' users');
			});
		});
	return true;
};

mongoose.model('User', UserSchema);