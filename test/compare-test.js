'use strict';

var chai = require('chai');
var expect = chai.expect
var compare = require(process.env.PWD + '/lib/compare');

var obj2;
var obj1 = obj2 = {
  'name': 'kirk'
  ,'age': 35
  ,'address': [{
    city: 'Brooklyn'
    ,state: 'New York'
  }]
};

var obj3 = {
  'name': 'Kate'
  ,'age': 'Unknown'
  ,'address': [{
    city: 'Unknown'
    ,state: 'New York'
  }]
};

var str2;
var str1 = str2 = "Hello world!";
var str3 = "Hello World";

var num1;
var num2 = num1 = 100000202;
var num3 = 200000202;

describe("Data", function() {
  it('should be equal objects', function() {
    expect(compare.isEqual(obj1, obj2)).to.equal(true);
  });

  it('should not be equal objects', function() {
    expect(compare.isEqual(obj1, obj3)).to.equal(false);
  });

  it('should be equal strings', function() {
    expect(compare.isEqual(str1, str2)).to.equal(true);
  });

  it('should not be equal strings', function() {
    expect(compare.isEqual(str1, str3)).to.equal(false);
  });

  it('should be equal numbers', function() {
    expect(compare.isEqual(num1, num2)).to.equal(true);
  });

  it('should not be equal numbers', function() {
    expect(compare.isEqual(num1, num3)).to.equal(false);
  });

  it('object should not equal null', function() {
    expect(compare.isEqual(null, {a: { a: 1 } })).to.equal(false);
  });

  it('null should equal null', function() {
    expect(compare.isEqual(null, null)).to.equal(true);
  })
});