const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 刪除最愛餐廳按鈕點下，login routes 會呼叫此function
exports.deletefavrest = (req, res) => {
  // 餐廳名稱
  const { dataid } = req.body;
  // 使用者姓名
  const favusername = req.user.name;

  console.log('dataid ');
  console.log(dataid);

  User.updateOne({ name: favusername }, { $pullAll: { favrest: [dataid] } },
    { overwrite: true }, (err) => {
      if (!err) {
        console.log('使用者刪除最愛餐廳');
      } else {
        console.log('使用者把餐廳最愛刪除失敗了拉');
      }
    });

  Restaurant.updateOne({ name: dataid }, { $pullAll: { favuser: [favusername] } },
    { overwrite: true }, (err) => {
      if (!err) {
        console.log('餐廳刪除愛我的人');
      } else {
        console.log('餐廳把喜歡我的使用者刪除失敗了拉');
      }
    });

  // User.findOne({ name: favusername }, (err, user) => {
  //   if (user) {
  //     res.user = user;
  //     console.log('複寫res.user');
  //     console.log(user);
  //     console.log(res.user);
  //   } else {
  //     console.log('重新試一次');
  //   }
  //   console.log('近來 findone');
  // });

  // console.log('find one 之後');
  // console.log(res.user);
  // console.log('sssssssssssssssssssssssssssss');
  // return done(null, User);
  res.redirect('/checkfavrest');
};
