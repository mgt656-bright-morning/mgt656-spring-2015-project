'use strict';
var lectures = require('../models/lecture.server.model.js');
var _ = require('lodash');

function lectureDetail (req, res) {

  console.log(req.params.slug);

  // See if we have a lecture with that slug
  var lecture = _.find(lectures.all, {slug: req.params.slug});
  if (typeof(lecture) === 'undefined') {
    return res.status(404).send({
      error: 'no such lecture: ' + req.params.slug,
    });
  }
  return res.render('lecture', {lecture: lecture});
}

module.exports = exports = {
  lectureDetail: lectureDetail
};