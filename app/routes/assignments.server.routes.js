'use strict';
var assignmentControllers = require('../../app/controllers/assignments.server.controller.js');

module.exports = function(app) {
  app.route('/assignments/:slug').get(assignmentControllers.assignmentDetail);
};