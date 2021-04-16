// 這個JS要連接線上的DB

// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://abc86:12345@locallibrary.wbibc.mongodb.net/test', {

//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = mongoose.Schema({
//   uid: String,
//   token: String,
//   email: String,
//   name: String,
//   gender: String,
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const keys = require('../keys');

mongoose.connect(`mongodb+srv://${keys.MONGODB_USER}:${keys.MONGODB_PWD}@cluster0.bdvkl.mongodb.net/foodoasis?retryWrites=true&w=majority`);

const UserSchema = mongoose.Schema({
  uid: String,
  token: String,
  email: String,
  name: String,
  gender: String,
  pic: String,
});

module.exports = mongoose.model('User', UserSchema);
