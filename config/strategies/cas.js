'use strict';

var passport = require('passport'),
  CasStrategy = require('passport-cas').Strategy,
  User = require('mongoose').model('User');

module.exports = function(){
  passport.use(new (CasStrategy)({
    version: 'CAS3.0',
    ssoBaseURL: 'https://secure.its.yale.edu/cas',
    serverBaseURL: 'http://localhost:3000',
    serviceURL: 'http://localhost:3000/auth/cas',
    validateURL: '/serviceValidate'
  }, function(profile, done) {
    var netid = profile.user;
    console.log(profile);
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

  User.addAdmins();

};