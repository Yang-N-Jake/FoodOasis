const Restaurant = require('../models/restaurant');

const User = require('../models/user');

// 新增最愛餐廳按鈕點下，Login routes 會呼叫此function
exports.addfavrest = (req, res, done) => {
  // 取得地點資訊
  const placename = req.body.enterplacename;
  const { placeId, geometry, name } = req.body;
  // 取得user資訊
  const favusername = req.user.name;

  // 儲存餐廳地點之前先做判斷
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
            favuser: favusername,
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
      const newfavrest = new Restaurant();
      newfavrest.formatted_address = placename;
      newfavrest.place_id = placeId;
      newfavrest.geometry = geometry;
      newfavrest.name = name;
      newfavrest.favuser = favusername;
      newfavrest.save((err2) => {
        if (err2) {
          throw err2;
        }
        // 成功後回傳
        return (newfavrest);
      });
    }
    return done(null, restexist);
  });

  // 新增用戶喜愛餐廳
  User.findOneAndUpdate(
    {
      name: favusername,
    },
    {
      $addToSet: {
        favrest: name,
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
  res.redirect('/addrestaurant');
};
