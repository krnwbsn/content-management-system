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
            title: 'Trans Studio Mall',
            lat: '-6.9261257',
            lng: '107.6343728'
        });

        map.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Map.collection.drop();
        done();
    });

    it('seharusnya mendapatkan daftar map yang ada di table map jika search title, lat dan lng dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/maps/search')
            .send({
                'title': 'Trans Studio Mall'
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

    // get list
    it('seharusnya mendapatkan semua daftar map yang ada di table maps dengan metode GET', function (done) {
        chai.request(server)
            .get('/api/maps')
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

    // edit data
    it('seharusnya bisa memperbaharui map melalui path /api/maps/<id> PUT', function (done) {
        chai.request(server)
            .get('/api/maps')
            .end(function (err, data) {
                chai.request(server)
                    .put(`/api/maps/${data.body[0]._id}`)
                    .send({ 'title': 'TSM', 'lat': data.body[0].lat, 'lng': data.body[0].lng })
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('_id');
                        response.body.data.should.have.property('title');
                        response.body.data.should.have.property('lat');
                        response.body.data.should.have.property('lng');
                        response.body.data.title.should.equal('TSM');
                        response.body.data.lat.should.equal(-6.9261257);
                        response.body.data.lng.should.equal(107.6343728);
                        done();
                    });
            });
    });

    // delete
    it('seharusnya menghapus satu map dari path /api/maps/<id> DELETE', function (done) {
        chai.request(server)
            .get('/api/maps')
            .end(function (err, data) {
                chai.request(server)
                    .delete(`/api/maps/${data.body[0]._id}`)
                    .end(function (error, response) {
                        response.should.have.status(201);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('_id');
                        response.body.data.should.have.property('title');
                        response.body.data.should.have.property('lat');
                        response.body.data.should.have.property('lng');
                        response.body.data._id.should.equal(data.body[0]._id);
                        response.body.data.title.should.equal('Trans Studio Mall');
                        response.body.data.lat.should.equal(-6.9261257);
                        response.body.data.lng.should.equal(107.6343728);
                        done();
                    });
            });
    });

    // browse
    it('seharusnya mencari satu data dari path /api/maps/<id> GET', function (done) {
        chai.request(server)
            .get('/api/maps')
            .end(function (err, data) {
                chai.request(server)
                    .get(`/api/maps/${data.body[0]._id}`)
                    .end(function (error, response) {
                        data.should.have.status(200);
                        response.body.should.be.a('object');
                        response.body.should.have.property('success');
                        response.body.should.have.property('message');
                        response.body.should.have.property('data');
                        response.body.data.should.have.property('_id');
                        response.body.data.should.have.property('title');
                        response.body.data.should.have.property('lat');
                        response.body.data.should.have.property('lng');
                        response.body.data._id.should.equal(data.body[0]._id);
                        response.body.data.title.should.equal('Trans Studio Mall');
                        response.body.data.lat.should.equal(-6.9261257);
                        response.body.data.lng.should.equal(107.6343728);
                        done();
                    });
            });
    });

})
