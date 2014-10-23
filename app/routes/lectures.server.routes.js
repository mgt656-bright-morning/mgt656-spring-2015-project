'use strict';
var lectureControllers = require('../../app/controllers/lectures.server.controller.js');

module.exports = function(app) {
  app.route('/lectures/:slug').get(lectureControllers.lectureDetail);
};