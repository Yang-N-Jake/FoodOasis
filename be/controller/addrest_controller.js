// onst addfavrest = require('../routes/login');

const Restaurant = require('../models/restaurant');

const User = require('../models/user');

exports.addfavrest = (req, res) => {
  const placename = req.body.enterplacename;
  const favusername = req.user.name;
  const { placeId, geometry, name } = req.body;

  Restaurant.findOne({ place_id: placeId }, (err, restexist) => {
    if (err) return (err);
    if (restexist) {
      Restaurant.findOneAndUpdate(
        {
          place_id: placeId,
        },
        {
          $addToSet: {
            favuser: favusername,
          },
        },
        (docerr, doc) => {
          if (docerr) {
            console.log('xXXXXXXXXXXXXXXXXXX');
          }
          console.log(doc);
        },
      );
    } else {
    // if no info, create new rest
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
        // success, return the new rest
        return (newfavrest);
      });
    }
  });

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
        console.log('xXXXXXXXXXXXXXXXXXX');
      }
      console.log(doc);
    },
  );
  res.redirect('/addrestaurant');
};
