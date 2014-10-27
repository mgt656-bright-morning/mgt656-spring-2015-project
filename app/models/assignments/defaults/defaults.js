'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

module.exports = exports = {};

exports.schemaObject = {
  dateSubmitted: { type: Date, default: Date.now},
  points: {type: Number, min: 0, max: 100},
  wasSubmitted: {type: Boolean, default: false}
};

exports.getCodeForm = function (overloads) {
  var defaults = {
      textarea: true, 
      help: 'Paste in the code you wrote here.', 
      name: 'code', 
      codeLanguage: 'markup', 
      rows: 20
  };
  return _.assign(defaults, overloads);
};