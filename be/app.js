const express = require('express');

const app = express();
// const createError = require('http-errors');
const path = require('path');
//  const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const mongoose = require('mongoose');

const session = require('express-session');
// 提供第三方登入服務的套件。
const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const routes = require('./routes/login');
const User = require('./models/user');
// const config = require('./config');

// const mongoose = require('mongoose');

// const session = require('express-session');

// 首頁改成html的套件
// const cons = require('consolidate');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const loginRouter = require('./routes/login');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*

// view engine 設定成html
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
*/

/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // passport-middleware插件
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true,
// }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));

//  passport.deserializeUser((obj, cb) => cb(null, obj));
passport.deserializeUser((id, done) => {
  User.findOne({ uid: id }, (err, user) => {
    done(err, user);
  });
  return done(null, id);
});

passport.use(new FacebookStrategy({
  clientID: keys.FB_AUTH_ID,
  clientSecret: keys.FB_AUTH_TOKEN,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['name', 'email', 'picture.type(large)'],
}, (accessToken, refreshToken, profile, done) => {
  // asynchronous
  process.nextTick(() => {
    // find the user in the database based on their facebook id
    User.findOne({ uid: profile.id }, (err, user) => {
      // if there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err) {
        return done(err);
      }
      // if the user is found, then log them in
      if (user) {
        console.log('user found');
        console.log(user);
        return done(null, user); // user found, return that user
      }
      // if there is no user found with that facebook id, create them
      const newUser = new User();

      // set all of the facebook information in our user model
      newUser.uid = profile.id; // set the users facebook id
      newUser.token = accessToken; // we will save the token that facebook provides to the user
      newUser.name = `${profile.name.givenName} ${profile.name.familyName}`;
      newUser.email = profile.emails[0].value;
      newUser.gender = profile.gender;
      newUser.pic = profile.photos[0].value;
      // save our user to the database
      newUser.save((err2) => {
        if (err2) {
          throw err2;
        }
        // if successful, return the new user
        return done(null, newUser);
      });
    });
  });
  // console.log(profile);
  // return done(null, profile);
}));

// app.use(session({
//   secret: 'thisissecretkey',
//   resave: false,
//   saveUninitialized: false,
// }));

// mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true }, { useUnifiedTopology: true });
// mongoose.set('useCreateIndex', true);

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   facebookId: String,
// });

// const User = new mongoose.model('User', userSchema);

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

// // passport-facebook套件
// app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

/*
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // 認證成功重新導向
    console.log('成功登入');
    res.redirect('/success');
  });
*/

// app.get('/success', (req, res) => {
//   res.send('使用FB登入成功');
//   console.log('成功');
// });

// app.get('/login', (req, res) => {
//   res.send('登入失敗，請重新登入');
//   console.log('失敗');
// });

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.use('/', routes);
// app.use('/users', usersRouter);
// app.use('/login', loginRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
