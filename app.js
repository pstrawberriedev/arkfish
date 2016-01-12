/*
 Learning Express DB Stuff
*/

// Require Core
//~~~~~~~~~~~~~~~~~~~~~~~
require('./database');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// Require Utilities
//~~~~~~~~~~~~~~~~~~~~~~~
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var lessMiddleware = require('less-middleware');


// Require Routes
//~~~~~~~~~~~~~~~~~~~~~~~
var routes = require('./routes/index');
//var dinos = require('./routes/dinos');

// Call Express
//~~~~~~~~~~~~~~~~~~~~~~~
var app = express();


// Set up views
//~~~~~~~~~~~~~~~~~~~~~~~
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


// Register partials
//~~~~~~~~~~~~~~~~~~~~~~~
// initial
hbs.registerPartials(path.join(__dirname + '/views/partials'));
// watch
hbsutils.registerWatchedPartials(path.join(__dirname + '/views/partials'));


// Use some shit!
//~~~~~~~~~~~~~~~~~~~~~~~
//Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
//Logger
app.use(logger('dev'));
//Body/Cookie Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//LESS Middleware
app.use(lessMiddleware(path.join(__dirname + '/public')));
//Static files
app.use(express.static(path.join(__dirname, 'public')));


// Do the routes
//~~~~~~~~~~~~~~~~~~~~~~~
app.use('/', routes);
//app.use('/dinos', dinos);


// If no routes
//~~~~~~~~~~~~~~~~~~~~~~~
app.use(function(req, res, next) {
  var err = new Error('Not Found wtfff');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Push to next thingy
//~~~~~~~~~~~~~~~~~~~~~~~
module.exports = app;
