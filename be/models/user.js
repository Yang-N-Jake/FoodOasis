// store user data to Database
const mongoose = require('mongoose');

const keys = require('../keys');

mongoose.connect(`mongodb+srv://${keys.MONGODB_USER}:${keys.MONGODB_PWD}@cluster0.bdvkl.mongodb.net/foodoasis?retryWrites=true&w=majority`);

const UserSchema = mongoose.Schema({
  uid: String,
  token: String,
  name: String,
  email: String,
  pic: String,
  favrest: [String],
});

module.exports = mongoose.model('User', UserSchema);
