'use strict';
module.exports = exports = {classes: []};
var glob = require('glob');
var yamlFront = require('yaml-front-matter');


glob('app/models/classes_data/*.yaml', function(err, files){
  console.log(files);
  for (var i = files.length - 1; i >= 0; i--) {
    exports.classes.push(yamlFront.loadFront(files[i], 'content'));
  }
  console.log(exports.classes);
});

