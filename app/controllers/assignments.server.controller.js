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

function submitAssignment (req, res) {
  if (req.method === 'POST') {
    console.log('post');
  }else if (req.method === 'GET'){
    console.log('get');
  }
  console.log('%%%%%%%%%%%%%%%%%%%');
  console.log(res.locals.assignment.submission.fields);
  res.render('submit-assignment', {
    assignment: res.locals.assignment
  });
}

module.exports = exports = {
  assignmentDetail: assignmentDetail,
  getAssignmentFromParams: getAssignmentFromParams,
  submitAssignment: submitAssignment
};