'use strict';

// Set up nunjucks templating
var nunjucks = require('nunjucks');
var moment = require('moment');
var marked = require('marked');
var njmarkdown = require('nunjucks-markdown');

marked.setOptions({
  langPrefix: 'language-'
});

// var oldCode = renderer.code;
// renderer.code = function(code, language){
//     console.log('0000000');
//     console.log(code);
//     console.log(oldCode(code));
//     console.log('0000000');
//     return oldCode(code);
// };

// marked.setOptions({
//   highlight: function (code) {
//     return code;
//   }
// });

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
  njmarkdown.register(env);
  env.addFilter('json', function(obj) {
    return JSON.stringify(obj);
  });
  env.addFilter('formatDate', function(obj, format) {
    return moment(obj).format(format);
  });
  env.addFilter('markdown', function(text) {
    return marked(text);
  });
  env.addFilter('andJoin', function(items, sep) {
    if (typeof(sep) === undefined) {
      sep = '&';
    }
    var sepString = ' ' + sep + ' ';
    var numItems = items.length;
    switch(numItems){
      case 0:
        return '';
      case 1:
        return items[0];
      case 2:
        return items.join(sepString);
      default:
        return items.slice(0, numItems - 1).join(', ') + sepString + numItems[-1];
    }
  });

};
