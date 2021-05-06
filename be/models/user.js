// 使用者資料
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
  mealrecord: [{ placeId: String, time: Date, comment: String }],
});

module.exports = mongoose.model('User', UserSchema);
