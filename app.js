
var randomString = require('random-string');
var randomstring = require('randomstring');
var express = require('express');
var app = express();
var configDB = require('./config/database.js');
var Person = require('./config/models/personSchema').Data;
var Card = require('./config/models/cardSchema').Data;
var Merchant = require('./config/models/merchantSchema').Data;
var Dump = require('./config/models/dumpSchema').Data;
var Deposit = require('./config/models/depositSchema').Data;
var Upload = require('./config/models/uploadSchema').Data;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var sendgrid  = require('sendgrid')();
var path = require('path');
var DateDiff = require('date-diff');
var firebase = require('firebase');
var rest = require('restler');
var kingbakura = require('./darklord-mega/payment');
var admin = require("firebase-admin");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
require('./config/passport')(passport);
//
//var io = require("socket-io");
//var app = require("express");

// port  = process.env.OPENSHIFT_NODEJS_PORT;
//var port = 2000;

var Slack = require('slack-node');
 
webhookUri = "https://hooks.slack.com/services/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";
 
slack = new Slack();
slack.setWebhook(webhookUri);
 
slack.webhook({
  channel: "#nodelogs",
  username: "nodeOpal",
  text: "This is posted to #node and comes from a bot named webhookbot."
}, function(err, response) {
  console.log(response);
});

var connection_string = ' ';
var moment = require('moment-timezone');
var schedule = require('node-schedule');

// if OPENSHIFT env variables are present, use the available connection info:
 // connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;
connection_string =process.env.MONGODB_URI;
// if OPENSHIFT env variables are present, use the available connection info:
//  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"+process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +process.env.OPENSHIFT_APP_NAME;
mongoose.connect(process.env.MONGODB_URI);
app.use(cookieParser());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true }));
//app.use(app.router);

//connection_string= '127.0.0.1:27017';
var upload = require('express-fileupload');
app.use(upload());
app.use(session({secret: 'thiefkingbakura', saveUninitialized:true, resave: true,  cookie : { secure : false, maxAge : ( 60 * 60 * 1000) },store: new MongoStore({  url:connection_string+"/sessions"})}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 app.use('/dashboard',express.static(__dirname + '/views'));
 
 app.use('/addcard',express.static(__dirname + '/views'));
 app.use('/registermerchant',express.static(__dirname + '/views'));
 app.use('/listcards',express.static(__dirname + '/views'));
 app.use('/listorders',express.static(__dirname + '/views'));
 app.use('/listdumps',express.static(__dirname + '/views'));
 app.use('/home',express.static(__dirname + '/instant'));
 app.use('/faq',express.static(__dirname + '/views'));
 app.use('/contact',express.static(__dirname + '/views'));
 app.use('/listmerchants',express.static(__dirname + '/views'));
 app.use('/auth',express.static(__dirname + '/views'));
 app.use('/full',express.static(__dirname + '/views'));
app.use('/portal',express.static(__dirname + '/views'));
app.use('/topup',express.static(__dirname + '/views'));
app.use('/iportal',express.static(__dirname + '/views'));
app.use('/broadcaster',express.static(__dirname + '/views'));
app.use('/transfer',express.static(__dirname + '/views'));
app.use('/withdraw',express.static(__dirname + '/views'));
app.use('/transactions',express.static(__dirname + '/views'));
app.use('/settings',express.static(__dirname + '/views'));
var secure = express.Router();
var auth= express.Router();
var formidable = require('formidable');
require('./routes/auth.js')(auth, passport,app);
var ua = require('universal-analytics');
var clientr = express.Router();
var visitor = ua('UA-107715939-1');

app.set('view engine','ejs');
visitor.pageview("/").send()
app.all('/*',function(req,res){
res.render('inst.ejs');
});
app.use('/auth',auth);
require('./routes/secure.js')(secure,app, passport);
app.use('/clientapp',clientr);
require('./routes/client')(clientr);
//app.use('/',express.static(__dirname + '/views'));

//mongoose.connect("mongodb://"+connection_string+"/person");
//mongoose.connect(configDB.url2);
//persondb = mongoose.createConnection("mongodb://localhost:27017/persons");
uploaddb = mongoose.createConnection("mongodb://"+connection_string+"/uploads");
persondb = mongoose.createConnection("mongodb://"+connection_string+"/users");
carddb = mongoose.createConnection("mongodb://"+connection_string+"/cards");
merchantdb = mongoose.createConnection("mongodb://"+connection_string+"/merchants");
dumpdb = mongoose.createConnection("mongodb://"+connection_string+"/dumps");
var personroute = express.Router();
var MobileMoney = kingbakura.Payment;
var Airtime = kingbakura.Airtime;
var Sms = kingbakura.Sms;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
 var head = "FreebieX";
// parse application/json 
app.use(bodyParser.json())
 var head = "InstantPins";
var pt = '/';
var pt2 = false;
var utmodel = {
         tfulldate: '',
         tdate: '',
         ttime: '',
         ttype: '',
         tamount: '',
}

var http = require('http');
//var express = require('express'),
    //app = module.exports.app = express();

var server = http.createServer(app);
//var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(process.env.PORT || process.env.port);