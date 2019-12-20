// 'use strict'

// const chai = require('chai');
// const chaiHTTP = require('chai-http');

// const server = require('../app')
// const Datadate = require('../models/datadate')

// const should = chai.should();
// chai.use(chaiHTTP);

// describe('data date', function () {
//   Datadate.collection.drop();

//   this.beforeEach(function (done) {
//     let user = new Datadate({
//       title: "Data Date Schema"
//     });

//     user.save(function (err) {
//       done()
//     })
//   });

//   this.afterEach(function (done) {
//     Datadate.collection.drop();
//     done();
//   });

//   // DATA DATE TEST UNIT
//   //#1 SEARCH
//   it('Seharusnya dapat menampilkan data date saat search letter & frequency melalui metode POST', function (done) {
//     chai.request(server)
//       .post('/api/datadate/search')
//       .send({
//         'letter': '2017-12-31',
//         'frequency': 1.1
//       })
//       .end(function (err, res) {
//         response.should.have.status(200);
//         res.should.be.json;
//       })
//   })

//   //#2 DATADATE FIND
//   it('Seharusnya mendapatkan data melalui d\metode GET', function (done) {
//     chai.request(server)
//       .get('/api/datadate/')
//       .end(function (err, res) {
//         response.should.have.status(200);
//         res.should.be.json
//       })
//   })

//   //#3 DATADATE POST
//   it('Seharusnya mendapatkan data melalui d\metode GET', function (done) {
//     chai.request(server)
//       .post('/api/datadate/')
//       .send({

//       })
//       .end(function (err, res) {
//         response.should.have.status(200);
//         res.should.be.json
//       })
//   })

//   //#4 PUT
//   //#5 DELETE
//   //#6 GET. FIND DATADATE

// })