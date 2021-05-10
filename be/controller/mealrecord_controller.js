const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 創建用餐紀錄按鈕點下，login routes 會呼叫此function
exports.mealrecord = (req, res, done) => {
  // 取得使用者資訊
  const favusername = req.user.name;
  const favuserid = req.user.uid;
  // 取得地點資訊
  const placeaddress = req.body.enterplacename;
  const { placeId, geometry, name } = req.body;
  // 取得用餐紀錄資訊
  const { gettime, comment } = req.body;
  console.log('000000000000000000000000000000000000000000000');
  console.log(placeId);
  console.log(req.body);
  console.log('000000000000000000000000000000000000000000000');
  // 儲存用餐紀錄之前先做判斷
  Restaurant.findOne({ place_id: placeId }, (err, restexist) => {
    if (err) return (err);
    // 若餐廳資訊已存在資料庫，做update
    if (restexist) {
      Restaurant.findOneAndUpdate(
        {
          // 篩選條件
          place_id: placeId,
        },
        {
          // 欲修改值
          $addToSet: {
            mealrecord: { uid: favuserid, time: gettime, comment },
          },
        },
        (error, doc) => {
          if (error) {
            console.log('發生錯誤請重新嘗試');
          }
          console.log(doc);
        },
      );
    } else {
    // 若資料庫中無此餐廳資料，則新增一筆新的資料
      const newrest = new Restaurant();
      newrest.formatted_address = placeaddress;
      newrest.place_id = placeId;
      newrest.geometry = geometry;
      newrest.name = name;

      // 初始化用餐紀錄
      newrest.mealrecord = [{ time: gettime, uid: favuserid, comment }];
      newrest.save((err2) => {
        if (err2) {
          throw err2;
        }
        // 成功後回傳
        return (newrest);
      });
    }
    return done(null, restexist);
  });
  // 新增用戶用餐紀錄
  User.findOneAndUpdate(
    {
      name: favusername,
    },
    {
      $addToSet: {
        mealrecord: { placeId: placeaddress, time: gettime, comment },
      },
    },
    (docerr, doc) => {
      if (docerr) {
        console.log('發生錯誤請重新嘗試');
      }
      console.log(doc);
    },
  );
  // 重新導向頁面
  res.redirect('/home');
};
