'use strict';
var assignments = require('../models/assignment.server.model.js');
var _ = require('lodash');

function assignmentDetail (req, res) {

  console.log(req.params.slug);

  // See if we have a assignment with that slug
  var assignment = _.find(assignments.all, {slug: req.params.slug});
  if (typeof(assignment) === 'undefined') {
    return res.status(404).send({
      error: 'no such assignment: ' + req.params.slug,
    });
  }
  return res.render('assignment', {
    assignment: assignment,
  });
}

module.exports = exports = {
  assignmentDetail: assignmentDetail
};