var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
require('./models/User');

mongoose.connect("mongodb://master:picpop123@ds059155.mongolab.com:59155/picpop");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

// Cloudinary Code
// Cloud Name: dpwesixb9
// API Key: 512467498246371
// API Secret: Iue6WQFKrHZkFTwIi5SS3YakSrU

cloudinary.config({ 
  cloud_name: 'dpwesixb9', 
  api_key: '512467498246371', 
  api_secret: 'Iue6WQFKrHZkFTwIi5SS3YakSrU' 
});

/*
Example Cloudinary Code
cloudinary.uploader.upload("http://res.cloudinary.com/demo/image/upload/couple.jpg", 
                           function(result) { console.log(result) },
                           { colors: true }); 
This should return the desired colors for everything
*/

module.exports = app;
