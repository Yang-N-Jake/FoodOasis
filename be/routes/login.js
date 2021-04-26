const express = require('express');

const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

// eslint-disable-next-line consistent-return
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/success', isLoggedIn, (req, res) => {
  res.render('success', { user: req.user });
});

router.get('/error', isLoggedIn, (req, res) => {
  res.render('error');
});

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/error',
  }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
