'use strict';
var glob = require('glob');

module.exports = glob('app/models/classes_data/*.yaml', function(err, files){
  console.log(files);
});
