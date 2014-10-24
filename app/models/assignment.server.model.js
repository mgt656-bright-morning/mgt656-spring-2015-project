'use strict';
module.exports = exports = {all: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');
var _ = require('lodash');
var path = require('path');

// Takes in a assignments and returns 
function makeAssignment (filePath) {
  var assignment = yamlFront.loadFront(filePath, 'content');
  assignment.slug = path.basename(filePath, '.yaml');
  return assignment;
}


// Find all the assignments from their YAML files
//
glob('data/assignments/*.yaml', function(err, files){
  for (var i = files.length - 1; i >= 0; i--) {
    exports.all.push(makeAssignment(files[i]));
  }
});

