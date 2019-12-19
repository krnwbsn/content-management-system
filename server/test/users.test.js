'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const userSchema = require('../models/user');

const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {
  // DROP COLLECTION BEFORE START TESTING
  userSchema.collection.drop();

  this.beforeEach(function (done) {
    let user = new userSchema({
      title: "User Schema"
    });

    user.save(function (err) {
      done()
    })
  });

  this.afterEach(function (done) {
    userSchema.collection.drop();
    done();
  });

  // USERS TEST UNIT
  //#1 REGISTER
  it('Seharusnya dapat melakukan register dengan metode POST', function (done) {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: "user@gmail.com",
        password: "1234",
        retypepassword: "1234"
      })
      .end(function (err, res) {
        res.should.have.status(201);
        done();
      })
  });


  //#2 LOGIN CHECK
  it('Seharusnya dapat melakukan autentikasi ke sistem API dengan metode POST', function (done) {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: "user@gmail.com",
        password: "1234",
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      })
  })

  //#3 LIST
  it('Seharusnya berhasil mendapatkan data user melalui metode GET', function (done) {
    chai.request(server)
      .get('/api/users/list')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      })
  })

  //#4 CHECK
  it('Seharusnya dapat mengecek token yang dimiliki dengan metode POST', function (done) {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: "user@gmail.com",
        password: "1234",
      })
      .end(function (err, res) {
        chai.request(server)
          .post('/api/users/check')
          .set('Authorization', res.body.token)
          .end(function (error, response) {
            response.should.have.status(200);
            response.should.be.json;
            done();
          })
      })
  })

  //#5 DESTROY
  it('Seharusnya dapat destroy token ketika melakukan logout dengan metode GET', function (done) {
    chai.request(server)
      .post('/api/users/login')
      .send({
        'email': 'user@gmail.com',
        'password': '1234'
      })
      .end(function (err, res) {
        chai.request(server)
          .get('/api/users/destroy')
          .set('Authorization', req.headers.authorization)
          .end(function (error, response) {
            response.should.have.status(200);
            response.should.be.json;
            done();
          })
      })
  })


})