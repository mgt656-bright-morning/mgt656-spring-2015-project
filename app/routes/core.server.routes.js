'use strict';
var users = require('../../app/controllers/users');

module.exports = function(app) {
  // Root routing
  var core = require('../../app/controllers/core');
  app.route('/').get(core.index);
  app.route('/about').get(core.about);
  // app.route('/schedule').get(users.requiresLogin, core.schedule);
};