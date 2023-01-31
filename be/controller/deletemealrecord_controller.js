const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 刪除用餐紀錄按鈕點下，login routes 會呼叫此function
exports.deletemealrecord = (req, res) => {
  // 取得餐廳地址
  const { deletemealrecord } = req.body;
  const favuseruid = req.user.uid;

  User.updateOne({ uid: favuseruid },
    {
      // 使用$pull update Object，$pullAll 則是 update Array
      $pull:
       { mealrecord: { placeId: deletemealrecord } },
    },
    { overwrite: true }, (err) => {
      // 此處為偵錯處理
      if (!err) {
        console.log('使用者成功刪除用餐紀錄');
      } else {
        console.log('用餐紀錄刪除失敗');
      }
    });

  Restaurant.updateOne({ formatted_address: deletemealrecord },
    { $pull: { mealrecord: { uid: favuseruid } } },
    { overwrite: true }, (err) => {
      // 此處為偵錯處理
      if (!err) {
        console.log('餐廳刪除使用者用餐紀錄成功');
      } else {
        console.log('餐廳沒有把使用者用餐紀錄刪除');
      }
    });

  res.redirect('/checkmealrecord');
};
