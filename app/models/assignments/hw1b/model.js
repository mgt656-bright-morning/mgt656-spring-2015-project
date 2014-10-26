var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var defaultSchema = require('../defaults/defaults.js').schemaObject;
var _ = require('lodash');

module.exports = exports = {};

exports.schemaObject = _.assign(defaultSchema, {
  code: {type: String, match: /^.{1,5000}/, inForm: true},
});