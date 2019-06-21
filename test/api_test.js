var supertest = require('supertest');
var should = require('should');
var testConfig = require('./test_config.json');
// Set the test scenario Here
var testScenario = "scenario_1"
var scenario = testConfig[testScenario]

//Start Listener
var server = supertest.agent(testConfig.server_url);

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
    server.get(`/api/projects/${scenario.project_id}`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      console.log('Result: ', res.body)
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });

  it('should give environments from GET/api/projects/:id/environments', function(done){
    server.get(`/api/projects/${scenario.project_id}/environments`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });

  it('should give packages from GET/api/projects/:id/packages', function(done){
    server.get(`/api/projects/${scenario.project_id}/packages`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.should.match(/.*DESCRIPTION.*/);
      done();
    });
  });


});

describe('DBm Java CLI actions', function(){

  it('Performs a deploy from POST/api/projects/:id/packages/:id/deploy{environmentName}', function(done){
    server.post(`/api/project/${scenario.project_id}/packages/${scenario.package_id}/deploy`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });

  it('Performs a package upload from POST/api/projects/:id/packages/upload', function(done){
    server.post(`/api/project/${scenario.project_id}/packages/upload`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });

  it('Performs a validation from POST/api/projects/:id/environments/:id/validate{packageName}', function(done){
    server.post(`/api/project/${scenario.project_id}/environments/${scenario.environment_id}/validate`)
    .expect("Content-type", /json/)
    .end(function(err,res){
      res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });
});
