const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

/* 以下這兩行是mongoose設定的code
const findOrCreate = require("mongoose-findorcreate");
const User = new mongoose.Model('User', userSchema);
*/

// 使用fb的strategy
passport.use(new FacebookStrategy({
  clientID: '926686007872841',
  clientSecret: 'c30b1fdd4a64a9b8dec03371a41d0eda',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['email', 'name'],
}, (accessToken, refreshToken, profile, done) => {
  console.log(accessToken, refreshToken, profile);
  const user = {};
  done(null, user);
}));

passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((obj, cb) => cb(null, obj));

module.exports = passport;
