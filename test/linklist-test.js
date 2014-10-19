'use strict';
var chai = require('chai');
var expect = chai.expect
var LinkedList = require(process.env.PWD + '/lib/datastructures/linkedlist.js');

describe("Linkedlist", function() {
  var linkedList = null;
  beforeEach(function() {
    linkedList = new LinkedList();
    linkedList.add({'name': 'kirk'});
    linkedList.add({'name': 'kate'});
    linkedList.add({'name': 'luke'});
  });

  it('Data should contain three names', function() {
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.end.data.name).to.equal('luke');
  });

  it('should add three names to a new array', function(done) {
    var current = linkedList.start;
    var names = [];
    while(current !== null) {
      names.push(current.data.name);
      current = current.next;
    }

    expect(typeof names).to.equal(typeof []);
    expect(names.length).to.equal(3);
    done();
  });

  it('should delete the first node', function(done) {
    linkedList.remove({'name': 'kirk'});
    expect(linkedList.start.data.name).to.not.equal('kirk');
    expect(linkedList.start.data.name).to.equal('kate');
    expect(linkedList.start.next.data.name).to.equal('luke');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the second node', function(done) {
    linkedList.remove({'name': 'kate'});
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('kate');
    expect(linkedList.start.next.data.name).to.equal('luke');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the last node', function(done) {
    linkedList.remove({'name': 'luke'});
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('luke');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the first and last node', function(done) {
    linkedList.remove({'name': 'luke'});
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('luke');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(2);

    linkedList.remove({'name': 'kirk'});
    expect(linkedList.start.data.name).to.not.equal('kirk');
    expect(linkedList.start.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(1);
    done();
  });
})