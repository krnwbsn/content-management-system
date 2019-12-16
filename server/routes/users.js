var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', (req, res, next) => {
  const { email, password, retypepassword } = req.body;
  let response = {
    status: false,
    message: '',
    data: {},
    token: ''
  }
  if (password == retypepassword) {
    User.findOne({ email }).then(result => {
      if (result) {
        response.message = 'Try another email';
        res.json(response);
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) throw err;
          else {
            const token = jwt.sign({ email: email }, 'cmsgituloh');
            const user = new User({
              email: req.body.email,
              password: hash,
              token: token
            })
            user.save().then(data => {
              console.log('data ' + data)
              response.status = true;
              response.message = 'Register success';
              response.data.email = email;
              response.data.password = password;
              response.token = token;
              res.status(201).json(response);
            }).catch(err => {
              response.message = 'Email or Password is not valid';
              res.status(500).json(err);
            })
          }
        })
      }
    })
  } else {
    response.message = 'Password is not match';
    res.json(response);
  }
});

router.post('/check', (req, res, next) => {
  let header = req.headers.authorization
  console.log('head ' + header)
  let response = {
    valid: false
  }
  if (typeof header !== undefined) {
    let checkToken = jwt.verify(header, 'cmsgituloh')
    User.find({ email: checkToken.email }).then(result => {
      if (result) {
        response.valid = true;
        res.status(200).json(response);
      } else {
        res.status(500).json(err);
      }
    }).catch(err => {
      res.status(500).json(err);
    })
  } else {
    res.status(500).json(err);
  }
})

router.get('/list', (req, res, next) => {
  User.find().then(response => {
    res.status(200).json(response);
  })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
