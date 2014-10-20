'use strict';

var node = require('./node');
var compare = require('../compare');
var LinkedList = function() {
  this.start = null;
  this.end = null;
  this.length = 0;
};

/**
Add a new node to the list

@param {Mixed} data Data to add 
*/
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
Inserts the data as the first node
in the list

@param {Mixed} data The data to add to 
the beginning of the list.
@return {Object} The newely inserted node
*/
LinkedList.prototype.addFirst = function(data) {
  if (null !== this.start && this.size() > 0) {
    var n = node.Node();
    n.data = data;
    n.next = this.start;
    this.start = n;
    this.length++;
    return n;
  }

  return null;
};

/**
Add the element to the end of the list

*/
LinkedList.prototype.addLast = function(data) {
  var n = node.Node();
  n.data = data;

  if (null === this.start && null === this.last) {
    return this.start = this.last = n;
  } 

  var current = this.start;
  while (current.next !== null) {
    current = current.next;
  }

  current.next = this.last = n;
  this.length++;
  return n;
};

/**
Inserts an element after element n

@param {Object} n Node element
@param {Mixed} data Data to insert after Node n
@return void
*/
LinkedList.prototype.insertAfter = function(n, data) { 
  var current = this.start;
  while (current !== null) {
    if (current.data === n.data) {
      var _node = node.Node();
      _node.data = data;
      _node.next = current.next;

      if (current === this.end) {
        this.end = _node;
      }

      ++this.length;
      return current.next = _node;
    }

    current = current.next;
  }
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

/**
Removes the n(th) element

@param {Number} idx The index position of the element
*/
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
};

LinkedList.prototype.size = function() {
  return this.length;
};


module.exports = LinkedList;