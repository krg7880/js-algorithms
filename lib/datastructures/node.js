'use strict';
/**
Defines a node that is used with a
linked list.

Linked list provides efficient memory
storage. 
**/
exports.Node = function () {
  return {
    previous: null
    ,data: null
    ,next: null
  };
};