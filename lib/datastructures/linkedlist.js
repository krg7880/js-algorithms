'use strict';

var node = require('./node');
var compare = require('../compare');
var LinkedList = function() {
  this.start = null;
  this.end = null;
  this.length = 0;
};

LinkedList.prototype.add = function(data) {
  var n = node.Node();
  if (this.start === null) {
    this.end = this.start = n;
  } else {
    this.end.next = n;
    this.end = this.end.next;
  }

  this.end.data = data;

  this.length ++;
};

/**
Removes an item from the list

@param {Mixed} data The node to remove based on the
data provided.
*/
LinkedList.prototype.remove = function(data) {
  if (this.start && this.start.data && compare.isEqual(this.start.data, data)) {
    this.length--;

    if (null !== this.start.next) {
      return this.start = this.start.next;
    }

    if (compare.isEqual(this.start, this.end)) {
      return this.start = this.end = null;
    }
  }

  var previous, current = this.start;
  while(current.next !== null) {
    previous = current;
    current = current.next;

    if (compare.isEqual(current.data, data)) {
      previous.next = (current.next) ? current.next : null;
      if (compare.isEqual(data, this.end.data)) {
        this.end = previous;
      }

      this.length--;
      break;
    }
  }
};

LinkedList.prototype.removeAt = function(idx) {
  if (idx < 0 || idx > this.size()) {
    return null;
  }

  if (this.start && this.start.data && idx === 0) {
    this.length--;

    if (null !== this.start.next) {
      return this.start = this.start.next;
    }

    if (compare.isEqual(this.start, this.end)) {
      return this.start = this.end = null;
    }
  }

  var previous, current = this.start;
  var i = 0;
  while(i++ < this.size()) {
    previous = current;
    current = current.next;

    if (i === idx) {
      previous.next = (current.next) ? current.next : null;
      if (compare.isEqual(previous.next, this.end.data)) {
        this.end = previous;
      }

      this.length--;
      break;
    }
  }
}

LinkedList.prototype.size = function() {
  return this.length;
};


module.exports = LinkedList;