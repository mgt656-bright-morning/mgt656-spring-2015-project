'use strict';

var lectures = require('../models/lecture.server.model.js');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
  res.render('index');
};
exports.about = function(req, res) {
	res.render('about');
};

// exports.schedule = function(req, res) {
//   res.render('schedule', {lectures: lectures.lectures});
// };