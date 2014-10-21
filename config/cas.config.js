'use strict';

var querystring = require('querystring');
var _ = require('lodash');
var settings = {
    version: 'CAS3.0',
    ssoBaseURL: 'https://secure.its.yale.edu/cas',
    serverBaseURL: 'http://localhost:3000',
    serviceURL: 'http://localhost:3000/auth/cas',
    validateURL: '/serviceValidate',
    casRoute: '/auth/cas'
};


module.exports = {
  settings: settings,
  getLoginUrl: function(input){
  	var url;

  	if (typeof(input) === 'string'){
  		url = input;
  	}else if(_.every([input.protocol, input.get('host'), input.originalUrl])){
  		url = input.protocol + '://' + input.get('host') + input.originalUrl;
  	}else if(typeof(input) === 'function'){
  		url = input();
  	}
    return settings.casRoute + '?' + querystring.stringify({next: url});
  }
};
