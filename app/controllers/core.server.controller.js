'use strict';

var meetings = require('../models/meeting.server.model.js');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {meetings: meetings.meetings});
};

// exports.schedule = function(req, res) {
//   res.render('schedule', {meetings: meetings.meetings});
// };