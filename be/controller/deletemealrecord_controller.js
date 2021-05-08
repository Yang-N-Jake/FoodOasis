const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 新增最愛餐廳按鈕點下，login routes 會呼叫此function
exports.deletemealrecord = (req, res) => {
  const { deletemealrecord } = req.body;
  const favuseruid = req.user.uid;

  console.log('deletemealrecord');
  console.log(deletemealrecord);
  console.log('comment');
  console.log(deletemealrecord.comment);
  console.log(deletemealrecord[comment]);	

  User.updateOne({ uid: favuseruid }, { $pullAll: { mealrecord: [deletemealrecord] } },
    { overwrite: true }, (err) => {
      if (!err) {
        console.log('使用者成功刪除用餐紀錄');
      } else {
        console.log('用餐紀錄刪除失敗');
      }
    });

  Restaurant.updateOne({ name: deletemealrecord }, { $pullAll: { mealrecord: [favuseruid] } },
    { overwrite: true }, (err) => {
      if (!err) {
        console.log('餐廳刪除使用者用餐紀錄成功');
      } else {
        console.log('餐廳沒有把使用者用餐紀錄刪除');
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
  // res.redirect('/checkmealrecord');
};
