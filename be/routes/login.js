const express = require('express');

const passport = require('passport');

const router = express.Router();

const favrestcontroller = require('../controller/addrest_controller');

const mealrecordcontroller = require('../controller/mealrecord_controller');

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

router.get('/mealrecord', isLoggedIn, (req, res) => {
  res.render('mealrecord', { user: req.user });
});

router.get('/favrest', (req, res) => {
  res.render('addrestaurant');
});

// 點擊新增按鈕後，呼叫favreset controller
router.post('/favrest', favrestcontroller.addfavrest);

// 點擊新增按鈕後，呼叫favreset controller
router.post('/mealrecord', mealrecordcontroller.mealrecord);

router.get('/home', isLoggedIn, (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/error', isLoggedIn, (req, res) => {
  res.render('error');
});

// FB 第三方登入
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/error',
  }));

// Google 第三方登入
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    // 成功、失敗導向位置
    successRedirect: '/home',
    failureRedirect: '/error',
  }));

// 帳號登出
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
