exports.isEqual = function(v1, v2) {
  if (typeof v1 !== typeof v2) {
    return false;
  }

  if (typeof v1 === typeof "" || typeof v1 === typeof 0) {
    return v1 === v2;
  }

  var _isEqual = true;

  if (typeof v1 === typeof {}) {
    var compare = function(value1, value2) {
      for (var i in value1) {
        if (!value2.hasOwnProperty(i)) {
          _isEqual = false;
          break;
        }

        if (typeof value1[i] === typeof {}) {
          compare(value1[i], value2[i]);
        } else if (typeof value1[i] === typeof "") {
          if (value1[i] !== value2[i]) {
            _isEqual = false;
            break;
          }
        }
      }
    }

    compare(v1, v2);
  }

  return _isEqual;
}