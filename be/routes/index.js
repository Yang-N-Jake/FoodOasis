const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  console.log('是跑index.js');
  res.render('index', { title: '美食綠洲' });
});

module.exports = router;
