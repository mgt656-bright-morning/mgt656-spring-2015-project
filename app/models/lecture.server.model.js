'use strict';
module.exports = exports = {all: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');
var _ = require('lodash');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// Takes in a lectures and returns 
function makeLecture (filePath) {
  var lecture = yamlFront.loadFront(filePath, 'content');
  if(_.has(lecture, 'slug') === false){
    lecture.slug = slugify(lecture.title);
  }
  return lecture;
}

function sortByDate (a, b) {
  return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
}

// Find all the lectures from their YAML files
//
glob('data/lectures/*.yaml', function(err, files){
  for (var i = files.length - 1; i >= 0; i--) {
    exports.all.push(makeLecture(files[i]));
  }
  exports.all.sort(sortByDate);
});

