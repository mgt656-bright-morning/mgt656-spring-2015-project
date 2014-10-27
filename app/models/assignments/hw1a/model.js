var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaults = require('../defaults/defaults.js');
var defaultSchema = defaults.schemaObject;
var _ = require('lodash');

module.exports = exports = {};

exports.schemaObject = _.assign(defaultSchema, {
  code: {
    type: String,
    match: /^.{1,5000}/,
    form: defaults.getCodeForm({
      title: 'Dash Project 2 code', 
      help: 'Paste in the code you wrote for Project 2 here.', 
    })
  },
});

exports.formFields = ['code'];