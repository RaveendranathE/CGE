var express = require('express');
var api = express.Router();

/* GET default (home page) */
api.get('/', function (request, response, next) {
  response.render('index.ejs', { title: 'JCE' });
});

// see more API controllers in the controllers folder
// togther, all api parts will manage the routing for the whole app

module.exports = api;