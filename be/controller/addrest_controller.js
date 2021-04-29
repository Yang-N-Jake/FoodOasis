// onst addfavrest = require('../routes/login');

const Favrest = require('../models/restaurant');

exports.addfavrest = function (req, res) {
  const placename = req.body.enterplacename;
  console.log('==========================');
  console.log('呼叫Controller成功，資訊如下:');
  console.log(placename);

  // 要抓其他的資訊
  // const placeid = req.body.place_id;
  // const placegeo = req.body.geometry;
  // const placeaddress = req.body.place.formatted_address;
  // console.log(placeid);
  // console.log(placegeo);
  // console.log(placeaddress);
  // eslint-disable-next-line consistent-return

  const newfavrest = new Favrest();
  newfavrest.name = placename;
  newfavrest.save((err2) => {
    if (err2) {
      throw err2;
    }
    // success, return the new rest
    return (newfavrest);
  });
  res.redirect('/addrestaurant');
};
