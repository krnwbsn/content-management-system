const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Map = require('../models/map');

const should = chai.should();
chai.use(chaiHTTP);

describe('map', function () {
    Map.collection.drop();

    beforeEach(function (done) {
        let map = new Map({
            letter: "A",
            frequency: "1.1"
        });

        map.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Map.collection.drop();
        done();
    });

    it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                'title': 'Trans Studio Mall',
                'lat': -6.9261257,
                'lng': 107.6343728
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].title.should.equal('Trans Studio Mall');
                res.body[0].lat.should.equal(-6.9261257);
                res.body[0].lng.should.equal(107.6343728);
                done();
            });
    });

    // it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
    //     chai.request(server)
    //         .post('/api/data/search')
    //         .send({
    //             'title': 'Trans Studio Mall',
    //             'lat': -6.9261257
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('title');
    //             res.body[0].should.have.property('lat');
    //             res.body[0].should.have.property('lng');
    //             res.body[0].title.should.equal('Trans Studio Mall');
    //             res.body[0].lat.should.equal(-6.9261257);
    //             res.body[0].lng.should.equal(107.6343728);
    //             done();
    //         });
    // });

    // it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
    //     chai.request(server)
    //         .post('/api/data/search')
    //         .send({
    //             'title': 'Trans Studio Mall',
    //             'lng': 107.6343728
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('title');
    //             res.body[0].should.have.property('lat');
    //             res.body[0].should.have.property('lng');
    //             res.body[0].title.should.equal('Trans Studio Mall');
    //             res.body[0].lat.should.equal(-6.9261257);
    //             res.body[0].lng.should.equal(107.6343728);
    //             done();
    //         });
    // });

    // it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
    //     chai.request(server)
    //         .post('/api/data/search')
    //         .send({
    //             'lat': -6.9261257,
    //             'lng': 107.6343728
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('title');
    //             res.body[0].should.have.property('lat');
    //             res.body[0].should.have.property('lng');
    //             res.body[0].title.should.equal('Trans Studio Mall');
    //             res.body[0].lat.should.equal(-6.9261257);
    //             res.body[0].lng.should.equal(107.6343728);
    //             done();
    //         });
    // });
    // it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
    //     chai.request(server)
    //         .post('/api/data/search')
    //         .send({
    //             'lat': -6.9261257
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('title');
    //             res.body[0].should.have.property('lat');
    //             res.body[0].should.have.property('lng');
    //             res.body[0].title.should.equal('Trans Studio Mall');
    //             res.body[0].lat.should.equal(-6.9261257);
    //             res.body[0].lng.should.equal(107.6343728);
    //             done();
    //         });
    // });
    // it('seharusnya mendapatkan daftar data yang ada di table data jika search title, lat dan lng dengan metode POST', function (done) {
    //     chai.request(server)
    //         .post('/api/data/search')
    //         .send({
    //             'lng': 107.6343728
    //         })
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('title');
    //             res.body[0].should.have.property('lat');
    //             res.body[0].should.have.property('lng');
    //             res.body[0].title.should.equal('Trans Studio Mall');
    //             res.body[0].lat.should.equal(-6.9261257);
    //             res.body[0].lng.should.equal(107.6343728);
    //             done();
    //         });
    // });

    // it('seharusnya mendapatkan semua daftar data yang ada di table datas dengan metode GET', function (done) {
    //     chai.request(server)
    //         .get('/api/data')
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('letter');
    //             res.body[0].should.have.property('frequency');
    //             res.body[0].letter.should.equal('A');
    //             res.body[0].frequency.should.equal(1.1);
    //             done();
    //         });
    // });

})
