// 這個JS要連接線上的DB

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abc86:12345@locallibrary.wbibc.mongodb.net/test', {

  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
  uid: String,
  token: String,
  email: String,
  name: String,
  gender: String,
});

module.exports = mongoose.model('User', userSchema);
