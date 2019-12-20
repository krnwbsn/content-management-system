const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Data = require('../models/data');

const should = chai.should();
chai.use(chaiHTTP);

describe('data', function () {
    Data.collection.drop();

    beforeEach(function (done) {
        let data = new Data({
            letter: "A",
            frequency: "1.1"
        });

        data.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Data.collection.drop();
        done();
    });

    it('seharusnya mendapatkan daftar data yang ada di table data jika search letter dan frequency dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                'letter': 'A',
                'frequency': 1.1
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it('seharusnya mendapatkan daftar data yang ada di table data jika search letter dan frequency dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                'letter': 'A'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it('seharusnya mendapatkan daftar data yang ada di table data jika search letter dan frequency dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                'frequency': 1.1
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it('seharusnya mendapatkan semua daftar data yang ada di table datas dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });

    it('seharusnya bisa memperbaharui data melalui path /api/data/<id> PUT', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, data) {
                chai.request(server)
                    .put(`/api/data/${data.body[0]._id}`)
                    .send({ 'letter': data.body[0].letter, 'frequency': 1.5 })
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.should.have.property('_id');
                        response.body.data.letter.should.equal('A');
                        response.body.data.frequency.should.equal(1.5);
                        done();
                    });
            });
    });

    it('seharusnya menghapus satu data dari path /api/data/<id> DELETE', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, data) {
                chai.request(server)
                    .delete(`/api/data/${data.body[0]._id}`)
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.should.have.property('_id');
                        response.body.data.letter.should.equal('A');
                        response.body.data.frequency.should.equal(1.1);
                        response.body.data._id.should.equal(data.body[0]._id);
                        done();
                    });
            });
    });

    it('seharusnya mencari satu data dari path /api/data/<id> GET', function (done) {
        chai.request(server)
            .get('/api/data')
            .end(function (err, data) {
                chai.request(server)
                    .get(`/api/data/${data.body[0]._id}`)
                    .end(function (error, response) {
                        data.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('letter');
                        response.body.data.should.have.property('frequency');
                        response.body.data.should.have.property('_id');
                        response.body.data.letter.should.equal('A');
                        response.body.data.frequency.should.equal(1.1);
                        response.body.data._id.should.equal(data.body[0]._id);
                        done();
                    });
            });
    });

})