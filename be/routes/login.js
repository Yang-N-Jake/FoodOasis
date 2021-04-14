const express = require('express');

const router = express.Router();

const passport = require('../config/passport');

router.get('/', (req, res) => {
  res.render('index', { title: '美食綠洲' });
});

router.get('/success', (req, res) => {
  console.log(req.user);
  res.render('success', { data: req.user });
});

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/',
  }));

module.exports = router;
