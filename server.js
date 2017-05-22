//index.js/
var express = require('express'),
    LocalStrategy = require('passport-local'),
    passport = require('passport'),
    session = require('express-session');


  //  TwitterStrategy = require('passport-twitter'),
  //  GoogleStrategy = require('passport-google'),
  //  FacebookStrategy = require('passport-facebook');

//We will be creating these two files shortly
// var config = require('./config.js'), //config file contains all tokens and other private info
//    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();
    server = require('http').createServer(app);
    io = require('socket.io')(server);

require('./config/middleware')(app,session,passport);
require('./config/views')(app);
require('./app/models/passport')(session,passport);
require('./config/routers')(app,session,passport,io);
//===============PASSPORT===============

//This section will contain our work with Passport

//===============EXPRESS================
// Configure Express


// Configure express to use handlebars templates
//===============ROUTES===============

//This section will hold our Routes

//===============PORT=================
var port = process.env.PORT || 5000; //select your port or let it pull from your .env file
console.log(process.env.DATABASE_URL);
server.listen(port);
console.log("listening on " + port + "!");
