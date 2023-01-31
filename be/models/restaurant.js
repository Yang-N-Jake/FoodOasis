// 餐廳
const mongoose = require('mongoose');

const keys = require('../keys');

mongoose.connect(`mongodb+srv://${keys.MONGODB_USER}:${keys.MONGODB_PWD}@cluster0.bdvkl.mongodb.net/foodoasis?retryWrites=true&w=majority`);

const restaurant = mongoose.Schema({
  id: String,
  place_id: String,
  name: String,
  geometry: String,
  formatted_address: String,
  favuser: [String],
  mealrecord: [{ uid: String, time: Date, comment: String }],
});

module.exports = mongoose.model('restaurant', restaurant);
