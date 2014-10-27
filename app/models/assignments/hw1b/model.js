var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaultSchema = require('../defaults/defaults.js').schemaObject;
var _ = require('lodash');

module.exports = exports = {};

exports.schemaObject = _.assign(defaultSchema, {
  code: {
    type: String,
    match: /^.{1,5000}/,
    form: {
      title: 'Dash Project 2 code', 
      textarea: true, 
      help: 'Paste in the code you wrote for Project 2 here.', 
      name: 'code', 
      codeLanguage: 'markup', 
      rows: 20
    }
  },
});

exports.formFields = ['code'];