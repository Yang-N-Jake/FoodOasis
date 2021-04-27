const express = require('express');

const router = express.Router();

// eslint-disable-next-line consistent-return
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/');
// }
// add get restaurant
router.get('/addrestaurant', (res) => {
  // res.render('addrestaurant', { user: req.user });
  res.redirect('/');
});

module.exports = router;
