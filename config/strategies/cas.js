'use strict';

var passport = require('passport'),
  CasStrategy = require('passport-cas').Strategy,
  casConfig = require('../cas.config.js'),
  User = require('mongoose').model('User');

module.exports = function(){
  console.log(casConfig.settings);
  passport.use(new (CasStrategy)(casConfig.settings,
    function(profile, done) {
      var netid = profile.user;
      User.findOne({netid: netid}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }
        return done(null, user);
      });
  }));

  // When the app first starts up, see if we need
  // to add missing admin users. This is useful in
  // development in particular.
  User.addAdmins();
};