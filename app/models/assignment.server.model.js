'use strict';
module.exports = exports = {all: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

// Takes in a assignments and returns 
function makeAssignment (filePath) {
  var assignment = yamlFront.loadFront(filePath, 'content');
  assignment.dirname = path.dirname(filePath);
  assignment.slug = path.basename(assignment.dirname);
  assignment.schemaObject = require(path.join(assignment.dirname, 'model.js')).schemaObject;
  assignment.fieldsInForm = [];
  var schemaKeys = _.keys(assignment.schemaObject);
  for (var i = schemaKeys.length - 1; i >= 0; i--) {
    var key = schemaKeys[i];
    if (assignment.schemaObject[key].inForm === true) {
      assignment.fieldsInForm.push(key);
    }
  }
  return assignment;
}


// Find all the assignments and load their config
// files as well as Schemas.
//
var subDir = 'assignments';
var assignmentNames = fs.readdirSync(path.join(__dirname, subDir));
for (var i = assignmentNames.length - 1; i >= 0; i--) {

  // Skip the "defaults" directory
  if (assignmentNames[i] === 'defaults') {
    continue;
  }
  var configPath = path.join(__dirname, subDir, assignmentNames[i], 'config.yaml');
  exports.all.push(makeAssignment(configPath));
}

exports.findBySlug = function (slug) {
  return _.find(exports.all, {slug: slug});
};

