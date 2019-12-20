const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require('../models/user');

const should = chai.should();
const { expect } = require('chai');
chai.use(chaiHTTP);

describe('users', function () {
    User.collection.drop();

    beforeEach(function (done) {
        let user = new User({
            email: 'user@gmail.com',
            password: '1234',
            token: ''
        });

        user.save(function (err) {
            done()
        })
    });

    afterEach(function (done) {
        User.collection.drop();
        done();
    });

    // register
    it('Seharusnya dapat melakukan register dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/register')
            .send({
                'email': 'krina@gmail.com',
                'password': '1234',
                'retypepassword': '1234'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                res.body.should.have.property('token');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('password');
                res.body.status.should.equal(true);
                res.body.message.should.equal('Register success')
                res.body.token.should.be.a('string');
                res.body.data.email.should.equal('krina@gmail.com');
                res.body.data.password.should.equal('1234');
                done();
            });
    });

    // list
    it('Seharusnya berhasil mendapatkan data user melalui metode GET', function (done) {
        chai.request(server)
            .get('/api/users/list')
            .end(function (err, res) {
                console.log(res)
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('password');
                res.body[0].should.have.property('token');
                res.body[0].email.should.equal('user@gmail.com');
                res.body[0].token.should.be.a('string')
                done();
            });
    });

    // login
    it('Seharusnya dapat melakukan autentikasi ke sistem API dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'krina@gmail.com',
                'password': '1234'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('token');
                res.body.email.should.equal('krina@gmail.com');
                res.body.token.should.be.a('string')
                done();
            });
    });

    // check
    it('Seharusnya value berubah menjadi true dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'user@gmail.com',
                'password': '1234'
            })
            .end(function (err, response) {
                console.log(response)
                const token = response.body.token;
                chai.request(server)
                    .post("/api/users/check")
                    .set("Authorization", token)
                    .end((err, res) => {
                        console.log(res)
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('valid');
                        res.body.valid.should.equal(true);
                        done();
                    });
            });
    });

    // destroy
    it('Seharusnya dapat logout session dengan token melalui metode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({
                'email': 'user@gmail.com',
                'password': '1234'
            })
            .end((err, response) => {
                const token = response.body.token;
                chai
                    .request(server)
                    .get('/api/users/destroy')
                    .set('Authorization', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('logout');
                        res.body.logout.should.equal(true);
                        done();
                    });
            });
    })

})