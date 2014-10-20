'use strict';
var chai = require('chai');
var expect = chai.expect
var LinkedList = require(process.env.PWD + '/lib/datastructures/linkedlist.js');

describe("LinkedList", function() {
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

  // test removing entries by data 
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
    var removed = linkedList.remove({'name': 'luke'});
    expect(removed.data.name).to.equal('luke');
    expect(linkedList.end.data.name).to.equal('kate');
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

  // test removing entries by index
  it('should delete the first node', function(done) {
    linkedList.removeAt(0);
    expect(linkedList.start.data.name).to.not.equal('kirk');
    expect(linkedList.start.data.name).to.equal('kate');
    expect(linkedList.start.next.data.name).to.equal('luke');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the second node', function(done) {
    var removed = linkedList.removeAt(1);
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('kate');
    expect(linkedList.start.next.data.name).to.equal('luke');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the last node', function(done) {
    linkedList.removeAt(2);
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('luke');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(2);
    done();
  });

  it('should delete the first and last node', function(done) {
    linkedList.removeAt(2);
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.not.equal('luke');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(2);

    linkedList.removeAt(0);
    expect(linkedList.start.data.name).to.not.equal('kirk');
    expect(linkedList.start.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(1);

    done();
  });

  it('should insert a new node after the first', function(done) {
    var start = linkedList.start;
    linkedList.insertAfter(start, {name: 'charles'});
    expect(linkedList.size()).to.equal(4);

    done();
  });

  // test insert first
  it('should insert the node as the start element', function(done) {
    linkedList.addFirst({name: 'first'});
    expect(linkedList.start.data.name).to.equal('first');
    expect(linkedList.start.next.data.name).to.equal('kirk');
    expect(linkedList.start.next.next.data.name).to.equal('kate');
    expect(linkedList.size()).to.equal(4);
    done();
  });

  // test insert last
  it('should insert the node as the tail element', function(done) {
    linkedList.addLast({name: 'last'});
    expect(linkedList.start.next.next.next.data.name).to.equal('last');
    expect(linkedList.start.next.next.data.name).to.equal('luke');
    expect(linkedList.start.next.data.name).to.equal('kate');
    expect(linkedList.last.data.name).to.equal('last');
    expect(linkedList.size()).to.equal(4);
    done();
  });

  // test insert at position n
  it('should insert the node at position (n)', function(done) {
    linkedList.insertAt(1, {name: 'nth'});
    expect(linkedList.start.data.name).to.equal('kirk');
    expect(linkedList.start.next.data.name).to.equal('nth');
    expect(linkedList.start.next.next.data.name).to.equal('kate');
    expect(linkedList.start.next.next.next.data.name).to.equal('luke');
    expect(linkedList.size()).to.equal(4);
    done();
  });

  // test if data exists in list
  it('should contain the specified element', function(done) {
    expect(linkedList.contains({name: 'kirk'})).to.equal(true);
    expect(linkedList.contains({name: 'luke'})).to.equal(true);
    expect(linkedList.contains({name: 'kate'})).to.equal(true);
    expect(linkedList.contains({name: 'pete'})).to.equal(false);
    expect(linkedList.size()).to.equal(3);
    done();
  });
})