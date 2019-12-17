var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/data', function(req, res) {
  res.render('data');
});

router.get('/data-date', function(req, res) {
  res.render('data-date');
});

router.get('/maps', function(req, res) {
  res.render('maps');
});

module.exports = router;
