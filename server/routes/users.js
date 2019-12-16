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
              response.status = true;
              response.message = 'Register success';
              response.data.email = email;
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

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  let response = {
    status: false,
    message: '',
    data: {},
    token: ''
  }

  User.find({ email }).then(result => {
    if (result) {
      bcrypt.compare(password, result[0].password, (err, data) => {
        if (err) {
          response.message = 'Auth Failed'
          res.status(401).json(response)
        } else if (data) {
          const newToken = jwt.sign({ email: email }, 'cmsgituloh');
          response.status = true;
          response.message = 'Log in success';
          response.data.email = email;
          response.token = newToken;
          User.updateOne({ email }, { token: newToken }, ((err) => {
            if (err) {
              response.message = 'Error!';
              res.status(401).json(response);
            } else {
              res.status(200).json(response);
            }
          })) 
        } else {
          response.message = 'Wrong email or password'
          res.status(401).json(response);
        }
      })
    } else {
      response.message = 'Auth failed';
      res.status(401).json(response);
    }
  }).catch(err => {
    response.message = 'Email or password is not valid';
    res.json(response);
  })
});

router.get('/list', (req, res, next) => {
  User.find().then(response => {
    res.status(200).json(response);
  })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/check', (req, res, next) => {
  let header = req.headers.authorization
  console.log('head ' + header)
});

router.post('/logout', (req, res, next) => {
  let header = req.headers.authorization
});

module.exports = router;
