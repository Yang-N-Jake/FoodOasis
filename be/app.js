const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const mongoose = require('mongoose');

// 首頁改成html的套件
const cons = require('consolidate');

// 提供第三方登入服務的套件。
const passport = require('passport');

// const facebookStrategy = require('passport-facebook').Strategy;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

// view engine 設定成html
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport-middleware插件
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// 初始化插件功能
app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true }, { useUnifiedTopology: true });
// mongoose.set('useCreateIndex', true);

/* const userSchema = new mongoose.Schema({
  email: String,
  Password: String,
  facebookId: String,
}); */

// const User = new mongoose.Model('User', userSchema);

// passport-facebook套件
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // 認證成功重新導向
    console.log('成功登入');
    res.redirect('/callback');
  });

/*
app.use('/login/fb',
  passport.authenticate('facebook'));

app.use('/failed/login', (req, res) => {
  res.send('login failed');
});

app.use('/fb/auth',
  passport.authenticate('facebook',
    { failureRedirect: '/failed/login' }, (req, res) => {
      console.log(req.user, req.isAuthenticated());
      res.send('logged in to facebook');
    }));

app.use('/logout', (req, res) => {
  req.logout();
  console.log(req.isAuthenticated());
  res.send('login failed');
});
*/

/* app.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  })); */

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
