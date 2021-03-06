const express = require('express');

const passport = require('passport');

const router = express.Router();

const favrestcontroller = require('../controller/addrest_controller');

const mealrecordcontroller = require('../controller/mealrecord_controller');

const deletefavrestcontroller = require('../controller/deletefavrest_controller');

const deletemealrecordcontroller = require('../controller/deletemealrecord_controller');

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

router.get('/checkfavrest', isLoggedIn, (req, res) => {
  res.render('checkfavrest', { user: req.user });
});

router.get('/checkmealrecord', isLoggedIn, (req, res) => {
  res.render('checkmealrecord', { user: req.user });
});

// 點擊刪除最愛餐廳按鈕，呼叫deletefavrestcontroller
router.post('/delete-item', deletefavrestcontroller.deletefavrest);

// 點擊刪除用餐紀錄按鈕，呼叫deletemealrecordcontroller
router.post('/deletemealrecord', deletemealrecordcontroller.deletemealrecord);

router.get('/favrest', (req, res) => {
  res.render('addrestaurant');
});

// 點擊新增最愛餐廳按鈕，呼叫favresetcontroller
router.post('/favrest', favrestcontroller.addfavrest);

// 點擊新增用餐紀錄按鈕，呼叫mealrecordcontroller
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
    // 成功、失敗導向頁面
    successRedirect: '/home',
    failureRedirect: '/error',
  }));

// 帳號登出
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
