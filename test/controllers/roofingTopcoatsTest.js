
var express = require('express');
var request = require("supertest");  // request
var should = require("should");
var expect = require("chai").expect;
const appport = 8081;
const appname = "jce";
const testId = 1;
const resourceName = "roofingTopcoats";  
var app = express();

describe("Materials - roofing Topcoats  unit test",function(){

  it("should return index page",function(done){
    request(app)
    .get(resourceName+"/")
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });
  it("should return create page",function(done){
    request(app)
    .get(resourceName+"/create")
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });
  it("should return delete page for id",function(done){
    request(app)
    .get(resourceName+"/delete/"+testId)
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });
  it("should return details page for id",function(done){
    request(app)
    .get(resourceName+"/details/"+testId)
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });
  it("should return edit page for id",function(done){
    request(app)
    .get(resourceName+"/edit/"+testId)
    .expect(200) // expected HTTP response
    .end(function(err,res){
      done();
    });
  });

});
