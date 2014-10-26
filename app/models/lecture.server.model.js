'use strict';
module.exports = exports = {all: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');
var _ = require('lodash');
var path = require('path');
var assignments = require('./assignment.server.model.js');

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

function joinLecturesWithAssignments (lectures) {
  var assignmentsByLectureIssued = _.groupBy(assignments.all, 'issued_with');
  var assignmentsByLectureDue = _.groupBy(assignments.all, 'due_with');
  console.log(assignmentsByLectureDue);
  for (var i = lectures.length - 1; i >= 0; i--) {
    var slug = lectures[i].slug;
    lectures[i].assignments_issued = assignmentsByLectureIssued[slug];
    lectures[i].assignments_due = assignmentsByLectureDue[slug];
  }
  return lectures;
}

// Alters lectures and assignments in the global scope
function addDueDatesToAssignments(){
  var lecturesBySlug = _.indexBy(exports.all, 'slug');
  for (var i = assignments.all.length - 1; i >= 0; i--) {
    var slug = assignments.all[i].due_with;
    assignments.all[i].due_date = lecturesBySlug[slug].date;
  }
}

// Find all the lectures from their YAML files
//
glob.sync(path.join(__dirname, 'lectures', '*.yaml'), function(err, files){
  for (var i = files.length - 1; i >= 0; i--) {
    exports.all.push(makeLecture(files[i]));
  }
  exports.all.sort(sortByDate);
  exports.all = joinLecturesWithAssignments(exports.all);
  addDueDatesToAssignments();
});

