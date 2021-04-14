const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

/*  mongoose.connect("mongodb://",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});  */

module.exports = router;
