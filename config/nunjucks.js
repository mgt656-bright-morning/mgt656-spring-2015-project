'use strict';

// Set up nunjucks templating
var nunjucks = require('nunjucks');
var strftime = require('strftime');

module.exports = function(app){
  var env = nunjucks.configure('app/views', {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '{{',
        variableEnd: '}}',
      }
  });
  env.addFilter('json', function(obj) {
    return JSON.stringify(obj);
  });
  env.addFilter('strftime', function(obj, format) {
    return strftime(format, obj);
  });

};
