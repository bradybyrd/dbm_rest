var supertest = require('supertest');
var should = require('should');

//Start Listener
var server = supertest.agent("http://localhost:3001");

// Unit Tests

describe('Basic DBmApi testing', function(){

  it('should return a home page', function(done){
    server.get("/api")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });

  it('should give a list of projects from GET/api/projects', function(done){
    server.get("/api/projects")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.length.should.be.above(1);
      //res.body[0].keys.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });

  it('should give a single projects from GET/api/projects/:id', function(done){
    server.get("/api/projects/1")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      console.log('Result: ', res.body)
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });

  it('should give environments from GET/api/projects/:id/environments', function(done){
    server.get("/api/projects/1/environments")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });

  it('should give packages from GET/api/projects/:id/packages', function(done){
    server.get("/api/projects/1/packages")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });


});

describe('DBm Java CLI actions', function(){

  it('should return a home page', function(done){
    server.get("/api")
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });
});
