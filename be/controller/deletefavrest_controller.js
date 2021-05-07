const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 新增最愛餐廳按鈕點下，login routes 會呼叫此function
exports.deletefavrest = (req, res) => {
  const { dataid } = req.body;
  const favusername = req.user.name;
  console.log('========================');
  console.log(dataid);

  User.updateOne({ name: favusername }, { $pullAll: { favrest: [dataid] } }, (err) => {
    if (!err) {
      console.log('使用者刪除最愛餐廳');
    } else {
      console.log('使用者把餐廳最愛刪除失敗了拉');
    }
  });

  Restaurant.findByIdAndDelete({ favuser: favusername }, (err) => {
    if (!err) {
      console.log('餐廳刪除愛我的人');
    } else {
      console.log('餐廳把喜歡我的使用者刪除失敗了拉');
    }
  });
  res.redirect('/checkfavrest');
};
