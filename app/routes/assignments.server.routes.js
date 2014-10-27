'use strict';
var assignmentControllers = require('../../app/controllers/assignments.server.controller.js');
var users = require('../../app/controllers/users');

module.exports = function(app) {
  app.use('/assignments/:slug', assignmentControllers.getAssignmentFromParams);
  app.route('/assignments/:slug')
    .get(assignmentControllers.assignmentDetail);
  app.route('/assignments/:slug/submit')
    .get(users.requiresLogin, assignmentControllers.submitAssignment)
    .post(users.requiresLogin, assignmentControllers.submitAssignment);
  app.route('/assignments/:slug/submission')
    .get(users.requiresLogin, assignmentControllers.viewSubmittedAssignment);
};