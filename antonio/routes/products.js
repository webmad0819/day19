const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/books', (req, res, next) => {
  res.render('index');
});

router.get('/bottles', (req, res, next) => {
  res.render('contact');
});

module.exports = router;
