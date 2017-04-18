// Module dependencies.
const http = require("http");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
var _ = require('lodash');
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const YAML = require('require-yaml');
const port = 8082;
const engines = require('consolidate')
const compression = require('compression');
const session = require('express-session');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');
global.passport = require('passport');

global.upload = multer({ dest: path.join(__dirname, 'uploads') });

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: '.env.example' });

// global config files
global.ensureAuthenticated = require('./config/ensureAuthenticated');
global.verify = require('./config/verify');
global.loadSeedData = require('./config/loadSeedData');
global.routes = require('./config/routes');

// Connect to MongoDB.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// =========================================================

// create express app 
global.app = express();
app.set('port', process.env.PORT || port);

// set the root view folder & specify the view engine 
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engines.ejs);
app.set("view engine", "ejs");

app.use(expressStatusMonitor());
app.use(compression());
/*
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
*/

// specify various resources and apply them to our application
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static(__dirname + '/assets/'));  // works for views in root view folder
app.use(expressLayouts);

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
/*
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(lusca.hsts({ maxAge: 31536000 }));
*/

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Set up SEED DATA  .................................................

loadSeedData.load();
// verify our sample data was imported correctly
verify.sampleDataImport();

// Set up ROUTING .................................................

// Request to this URI will be handled by this CONTROLLER..........
routes.defineRoutes();
// Primary app routes.
routes.definePrimaryAppRoutes();
// API examples routes.
routes.defineApiRoutes();
//OAuth authentication routes. (Sign in)
routes.defineAuthenticationRoutes();
// OAuth authorization routes. (API examples)
routes.defineAuthorizationRoutes();
// end routing ================================================

app.use(errorHandler());

// handle page not found errors
app.use(function (request, response) {
  response.status(404).render("404.ejs");
});

/*
// create server by injecting our express app
var server = http.createServer(app);

// Listen for an application http request on port 8081 
server.listen(port, function () {
  console.log('Listening on http://127.0.0.1:' + port);
});
*/
app.listen(app.get('port'), () => {
  console.log('For a better experience, always PULL new code before any modifications.');
  console.log('Pull, SMALL change, test, commit.');
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;


