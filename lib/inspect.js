'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

require('babel-polyfill');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = require('path');

exports = module.exports = function () {
  return function (stylus) {
    // const ret = searchValue(args, 'bar', 10);
    // console.log(ret);
    // stylus
    //   .define('mosya', mosya);
    console.log(this.evaluator.global.scope.locals['string-var']);
  };
};

function searchKey(o, searchingKey, depth) {
  var ret = [];
  _searchKey(o);
  return ret;

  function _searchKey(o) {
    var history = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    if (history.length >= depth) {
      return;
    }
    var newHistory = [].concat(_toConsumableArray(history));
    if (o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {
      var keys = Object.keys(o);
      var i = keys.indexOf(searchingKey);
      if (i !== -1) {
        newHistory.push(keys[i]);
        ret.push(newHistory);
      } else {
        keys.forEach(function (nextKey) {
          _searchKey(o[nextKey], newHistory.concat(nextKey));
        });
      }
    } else {
      return null;
    }
  }
}

function searchValue(o, searchingValue, depth) {
  var ret = [];
  _searchValue(o);
  return ret;

  function _searchValue(o) {
    var history = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    if (history.length >= depth) {
      return;
    }
    var newHistory = [].concat(_toConsumableArray(history));
    if (o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {
      var entries = Object.entries(o);
      var i = entries.findIndex(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];
        return v === searchingValue;
      });
      if (i !== -1) {
        var _entries$i = _slicedToArray(entries[i], 1);

        var k = _entries$i[0];

        newHistory.push(k);
        ret.push(newHistory);
      } else {
        entries.forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2);

          var k = _ref4[0];
          var v = _ref4[1];

          _searchValue(v, newHistory.concat(k));
        });
      }
    } else {
      return null;
    }
  }
}
