// store restaurant data to Database
const mongoose = require('mongoose');

const keys = require('../keys');

mongoose.connect(`mongodb+srv://${keys.MONGODB_USER}:${keys.MONGODB_PWD}@cluster0.bdvkl.mongodb.net/foodoasis?retryWrites=true&w=majority`);

const restaurant = mongoose.Schema({
  place_id: String,
  name: String,
  geometry: String,
  formatted_address: String,
});

module.exports = mongoose.model('restaurant', restaurant);
