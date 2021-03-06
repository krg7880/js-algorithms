'use strict';

var node = require('./node');
var compare = require('../compare');
var LinkedList = function() {
  this.start = null;
  this.end = null;
  this.length = 0;
};

/**
Add a new node to the end of the list

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

      this.length++;
      return current.next = _node;
    }

    current = current.next;
  }
};

/**
Return but does not remove the head (first)
element of the list

@return {Object} The head (first) element
*/
LinkedList.prototype.getFirst = LinkedList.prototype.peek =  LinkedList.prototype.element = function() {
  return this.start;
};

/**
Return but does not remove the tail (last)
element of the list

@return {Object} The tail (last) element
*/
LinkedList.prototype.getLast = function() {
  return this.last;
};

LinkedList.prototype.insertAt = function(idx, data) {
  if (idx < 0 || idx > this.size()) {
    throw new Error('IndexOutOfBoundsException')
  }

  var i = 0;
  var current = this.start;
  var previous = current;
  var n = node.Node();
  n.data = data;

  while(i++ < idx) {
    previous = current;
    current = current.next;
  }

  n.next = current;
  previous.next = n;

  this.length++;
  return n;
};

LinkedList.prototype.contains = function(data) {
  if (this.size() < 0 || null === this.start) {
    return false;
  }

  var current = this.start;
  var isEqual = false;
  while (current !== null) {
    if (compare.isEqual(current.data, data)) {
      isEqual = true;
      break;
    }

    current = current.next;
  }

  return isEqual;
};

/**
Clears the list of all items

@return void
*/
LinkedList.prototype.clear = function() {
  if (this.size() > 0) {
    this.first = this.last = null;
    this.length = 0;
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

      // check if we're removing the "last" item
      // and reset it accordingly...
      if (compare.isEqual(data, this.end.data)) {
        this.end = previous;
      }

      this.length--;
      break;
    }
  }

  return current;
};

/**
Removes the n(th) element

@param {Number} idx The index position of the element
*/
LinkedList.prototype.removeAt = function(idx) {
  if (idx < 0 || idx > this.size()) {
    throw new Error('IndexOutOfBoundsException')
  }

  if (this.start && this.start.data && idx === 0) {
    this.length--;

    if (null !== this.start.next) {
      var tmp = this.start;
      this.start = this.start.next;
      return tmp;
    }

    if (compare.isEqual(this.start, this.end)) {
      var tmp = this.start;
      this.start = this.end = null;
      return tmp;
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

  return current;
};

LinkedList.prototype.size = function() {
  return this.length;
};


module.exports = LinkedList;