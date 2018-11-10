/**
 * http://usejsdoc.org/
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser'); 
var lineReader = require('line-reader');
var index = require('./routes/index');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/eRecruitDB');
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies." } ));
app.use(cookieParser());

app.use(function(req, res, next)
{
    req.db = db;
    console.log(db);
    next();
});

app.use('/',index);
module.exports = app;
app.listen(3000);
