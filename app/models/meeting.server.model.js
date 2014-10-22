'use strict';
module.exports = exports = {meetings: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');

// Takes in a meetings and returns 
function makeMeeting (filePath) {
  var meeting = yamlFront.loadFront(filePath, 'content');
  return meeting;
}

function sortByDate (a, b) {
  return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
}

// Find all the meetings from their YAML files
//
glob('data/meetings/*.yaml', function(err, files){
  console.log(files);
  for (var i = files.length - 1; i >= 0; i--) {
    exports.meetings.push(makeMeeting(files[i]));
  }
  exports.meetings.sort(sortByDate);
  console.log(exports.meetings);
});

