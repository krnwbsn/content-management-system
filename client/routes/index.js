var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/home', function (req, res) {
  res.render('home');
});

router.get('/data', function (req, res) {
  res.render('data');
});

router.get('/datadate', function (req, res) {
  res.render('datadate');
});

router.get('/line', function (req, res) {
  res.render('line');
});

router.get('/bar', function (req, res) {
  res.render('bar');
});

router.get('/pie', function (req, res) {
  res.render('pie');
});

router.get('/map', function (req, res) {
  res.render('map');
});


router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/register', function (req, res) {
  res.render('register');
});


module.exports = router;
