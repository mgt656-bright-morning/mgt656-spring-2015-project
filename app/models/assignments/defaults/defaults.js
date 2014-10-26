var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = exports = {};

exports.schemaObject = {
  dateSubmitted: { type: Date, default: Date.now},
  points: {type: Number, min: 0, max: 100},
  wasSubmitted: {type: Boolean, default: false}
};