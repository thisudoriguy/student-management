const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const pug = require('pug');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash    = require('connect-flash');
const methodOverride = require('method-override');



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const routes = require('./routes/index');

const app = express();

const mongoDB = process.env.db; 
mongoose.Promise = global.Promise;
require('./config/passport')(passport);
mongoose.connect(mongoDB, {
  useMongoClient: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}

/*var storage = filesStoreHere({
  destination: function (req, file, callback) {
    cb(null, '/uploads/' + file.originalname)
  }
})
*/
app.use('/', routes);


 

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });

  app.listen(process.env.PORT);
  