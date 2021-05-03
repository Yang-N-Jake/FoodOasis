const express = require('express');

const passport = require('passport');

const router = express.Router();

const favrestcontroller = require('../controller/addrest_controller');

router.get('/', (req, res) => {
  res.render('login');
});

// eslint-disable-next-line consistent-return
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/addrestaurant', isLoggedIn, (req, res) => {
  res.render('addrestaurant', { user: req.user });
});

router.get('/favrest', (req, res) => {
  res.render('addrestaurant');
});

// favrest form post, call favrestcontroller
router.post('/favrest', favrestcontroller.addfavrest);

router.get('/home', isLoggedIn, (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/error', isLoggedIn, (req, res) => {
  res.render('error');
});

// get FB auth
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/error',
  }));

// get GOOGLE auth
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/error',
  }));

// get logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
