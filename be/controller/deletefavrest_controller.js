const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 刪除最愛餐廳按鈕點下，login routes 會呼叫此function
exports.deletefavrest = (req, res) => {
  // 餐廳名稱
  const { dataid } = req.body;
  // 使用者姓名
  const favusername = req.user.name;

  User.updateOne({ name: favusername }, { $pullAll: { favrest: [dataid] } },
    { overwrite: true }, (err) => {
      // 此處為偵錯處理
      if (err) {
        console.log('使用者刪除最愛餐廳發生錯誤');
      }
    });

  Restaurant.updateOne({ name: dataid }, { $pullAll: { favuser: [favusername] } },
    { overwrite: true }, (err) => {
      // 此處為偵錯處理
      if (err) {
        console.log('餐廳刪除用戶發生錯誤');
      }
    });

  res.redirect('/checkfavrest');
};
