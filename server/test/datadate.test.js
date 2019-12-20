'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app')
const Datadate = require('../models/datadate')

const should = chai.should();
chai.use(chaiHTTP);

describe('datadate', function () {
  Datadate.collection.drop();

  beforeEach(function (done) {
    let datadate = new Datadate({
        letter: "27-12-11",
        frequency: "1.1"
    });

    datadate.save(function (err) {
      done()
    })
  });

  afterEach(function (done) {
    Datadate.collection.drop();
    done();
  });

  // search
    it('seharusnya mendapatkan daftar data yang ada di table data jika search letter dan frequency dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/datadate/search')
            .send({
                'letter': '27-12-11',
                'frequency': 1.1
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('27-12-11');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    // get list
    it('seharusnya mendapatkan semua daftar data yang ada di table datas dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/datadate')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('27-12-11');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    // edit data
    it('seharusnya bisa memperbaharui data melalui path /api/data/<id> PUT', function (done) {
        chai.request(server)
            .get('/api/datadate')
            .end(function (err, data) {
                chai.request(server)
                    .put(`/api/datadate/${data.body[0]._id}`)
                    .send({ 'letter': '28-12-11', 'frequency': data.body[0].frequency })
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('_id');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.letter.should.equal('28-12-11');
                        response.body.data.frequency.should.equal(1.1);
                        done();
                    });
            });
    });

    // delete
    it('seharusnya menghapus satu data dari path /api/data/<id> DELETE', function (done) {
        chai.request(server)
            .get('/api/datadate')
            .end(function (err, data) {
                chai.request(server)
                    .delete(`/api/datadate/${data.body[0]._id}`)
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.should.have.property('_id');
                        response.body.data.letter.should.equal('27-12-11');
                        response.body.data.frequency.should.equal(1.1);
                        response.body.data._id.should.equal(data.body[0]._id);
                        done();
                    });
            });
    });

    // browse
    it('seharusnya mencari satu data dari path /api/data/<id> GET', function (done) {
        chai.request(server)
            .get('/api/datadate')
            .end(function (err, data) {
                chai.request(server)
                    .get(`/api/datadate/${data.body[0]._id}`)
                    .end(function (error, response) {
                        data.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.should.have.property('_id');
                        response.body.data.letter.should.equal('27-12-11');
                        response.body.data.frequency.should.equal(1.1);
                        response.body.data._id.should.equal(data.body[0]._id);
                        done();
                    });
            });
    });
})