'use strict';

var classes = require('../models/class.server.model.js');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index');
};

exports.schedule = function(req, res) {
  res.render('schedule');
};