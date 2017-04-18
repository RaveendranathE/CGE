var express = require('express');
var request = require("supertest");  // request
var should = require("should");
var expect = require("chai").expect;
const appport = 8081;
const appname = "jce";
var app = express();

describe("Home page unit test",function(){

  it('should know appname is a string', function() {
      expect(appname).to.be.a("string");
  });
  it('should know appname is jce', function() {
      expect(appname).to.equal("jce");
  });
  it('should know appname is 3 letters long', function() {
      expect(appname).to.have.length(3);
  });
  it("should return home page",function(done){
    request(app)
    .get("/")
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });

});