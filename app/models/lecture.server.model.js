'use strict';
module.exports = exports = {all: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');

// Takes in a lectures and returns 
function makeLecture (filePath) {
  var lecture = yamlFront.loadFront(filePath, 'content');
  return lecture;
}

function sortByDate (a, b) {
  return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
}

// Find all the lectures from their YAML files
//
glob('data/lectures/*.yaml', function(err, files){
  console.log('-----------');
  console.log(files);
  console.log('-----------');
  for (var i = files.length - 1; i >= 0; i--) {
    exports.all.push(makeLecture(files[i]));
  }
  exports.all.sort(sortByDate);
  console.log(exports.all);
});

