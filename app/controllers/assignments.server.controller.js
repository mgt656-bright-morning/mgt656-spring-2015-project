'use strict';
var assignments = require('../models/assignment.server.model.js');
var _ = require('lodash');

// Middleware to get an assignment by slug
// 
function getAssignmentFromParams (req, res, next) {

  // See if we have a assignment with that slug
  var assignment = assignments.findBySlug(req.params.slug);
  if (typeof(assignment) === 'undefined') {
    return res.status(404).send({
      error: 'no such assignment: ' + req.params.slug,
    });
  }
  res.locals.assignment = assignment;
  next();
}

function assignmentDetail (req, res) {
  return res.render('assignment', {
    assignment: res.locals.assignment,
  });
}

function viewSubmittedAssignment (req, res) {
  return res.render('assignment-submission');
}

function submitAssignment (req, res) {
  var assignment = res.locals.assignment;
  if (req.method === 'POST') {
    for (var i = assignment.formFields.length - 1; i >= 0; i--) {
      var f = assignment.formFields[i];
      var value = req.body[f];
      if (_.isEmpty(value) === false) {
        res.locals.user.assignments[assignment.slug][f] = value;
      }
    }
    return res.locals.user.save(function(err){
      res.redirect('/assignments/' + assignment.slug + '/submission');
    });
  }else if (req.method === 'GET'){
    return res.render('submit-assignment', {
      assignment: assignment
    });
  }
}

module.exports = exports = {
  assignmentDetail: assignmentDetail,
  getAssignmentFromParams: getAssignmentFromParams,
  submitAssignment: submitAssignment,
  viewSubmittedAssignment: viewSubmittedAssignment
};