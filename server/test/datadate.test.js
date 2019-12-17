'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app')
const Datadate = require('../models/datadate')

const should = chai.should();
chai.use(chaiHTTP);

describe('data date', function(){
  Datadate.collection.drop();

  this.beforeEach(function(done){
    let user = new Datadate({
      title: "Data Date Schema"
    });

    user.save(function(err){
      done()
    })
  });

  this.afterEach(function(done){
    Datadate.collection.drop();
    done();
  });

  // DATA DATE TEST UNIT
  //#1 SEARCH
  it('', function(done){
    
  })


})