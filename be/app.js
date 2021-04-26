// Basic settings
const express = require('express');

const app = express();

const path = require('path');

const logger = require('morgan');

// FB login package
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// Google login package
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// get keys
const keys = require('./keys');

// routes and user
const routes = require('./routes/login');
const User = require('./models/user');

// homepage.ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  homepage.html

// const cons = require('consolidate');
// view engine 設定成html
// app.engine('html', cons.swig);
// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));

//  homepage.pug

//  view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// FB session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// FB passport init
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// use FB Strategy
passport.use(new FacebookStrategy({
  clientID: keys.FB_AUTH_ID,
  clientSecret: keys.FB_AUTH_TOKEN,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    // eslint-disable-next-line consistent-return
    console.log(profile);
    User.findOne({ uid: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      const newUser = new User();
      // set fb information
      newUser.uid = profile.id;
      newUser.token = accessToken;
      newUser.name = profile.displayName;
      newUser.email = profile.emails[0].value;
      newUser.pic = profile.photos[0].value;
      // save user to the database
      newUser.save((err2) => {
        if (err2) {
          throw err2;
        }
        // success, return the new user
        return done(null, newUser);
      });
    });
  });
}));

// use GOOGLE Strategy
passport.use(new GoogleStrategy({
  clientID: keys.GOOGLE_AUTH_ID,
  clientSecret: keys.GOOGLE_AUTH_TOKEN,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  profileFields: ['id', 'displayName', 'name', 'picture.type(large)', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    // eslint-disable-next-line consistent-return
    User.findOne({ uid: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
      const newUser = new User();
      // set fb information
      newUser.uid = profile.id;
      newUser.token = accessToken;
      newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.email = profile.emails[0].value;
      newUser.pic = profile.photos[0].value;
      // save user to the database
      newUser.save((err2) => {
        if (err2) {
          throw err2;
        }
        // success, return the new user
        return done(null, newUser);
      });
    });
  });
}));
app.use('/', routes);

module.exports = app;
