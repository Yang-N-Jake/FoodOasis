// onst addfavrest = require('../routes/login');

const Favrest = require('../models/restaurant');

const Favuser = require('../models/user');

exports.addfavrest = function (req, res) {
  const placename = req.body.enterplacename;
  const favusername = req.user.name;
  const { placeId, geometry, name } = req.body;
  console.log('==========================');
  console.log('呼叫Controller成功，資訊如下:');
  console.log(placename);
  console.log(placeId);
  console.log(geometry);
  console.log(name);
  console.log('==========================');
  console.log('目前使用者是:');
  console.log(favusername);

  // 要抓其他的資訊
  // const placeid = req.body.place_id;
  // const placegeo = req.body.geometry;
  // const placeaddress = req.body.place.formatted_address;
  // console.log(placeid);
  // console.log(placegeo);
  // console.log(placeaddress);
  // eslint-disable-next-line consistent-return

  const newfavrest = new Favrest();
  newfavrest.formatted_address = placename;
  newfavrest.place_id = placeId;
  newfavrest.geometry = geometry;
  newfavrest.name = name;
  newfavrest.favuser = favusername;
  newfavrest.save((err2) => {
    if (err2) {
      throw err2;
    }
    // success, return the new rest
    return (newfavrest);
  });

  let newfavuser = mongoose.model("User", UserSchema);
  
  const newfavuser = new Favuser();

  newfavuser.findOneAndUpdate(
    {
      favrest: '',
    },
    {
      favrest: name,
    },
    {
      upsert: true,
    },
  );

  // newfavuser.save((err2) => {
  //   if (err2) {
  //     throw err2;
  //   }
  //   // success, return the new rest
  //   return (newfavrest);
  // });

  res.redirect('/addrestaurant');
};
