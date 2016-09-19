import 'babel-polyfill';
const path = require('path');

exports = module.exports = function() {
  return function(stylus) {
    // const ret = searchValue(args, 'bar', 10);
    // console.log(ret);
    // stylus
    //   .define('mosya', mosya);
    console.log(this.evaluator.global.scope.locals['string-var']);
  };
};


function searchKey(o, searchingKey, depth) {
  const ret = [];
  _searchKey(o);
  return ret;

  function _searchKey(o, history = []) {
    if (history.length >= depth) { return; }
    const newHistory = [...history];
    if (o != null && typeof o === 'object') {
      const keys = Object.keys(o);
      let i = keys.indexOf(searchingKey);
      if (i !== -1) {
        newHistory.push(keys[i]);
        ret.push(newHistory);
      } else {
        keys.forEach(nextKey => {
          _searchKey(o[nextKey], newHistory.concat(nextKey));
        });
      }
    } else {
      return null;
    }
  }
}

function searchValue(o, searchingValue, depth) {
  const ret = [];
  _searchValue(o);
  return ret;

  function _searchValue(o, history = []) {
    if (history.length >= depth) { return; }
    const newHistory = [...history];
    if (o != null && typeof o === 'object') {
      const entries = Object.entries(o);
      let i = entries.findIndex(([k, v]) => v === searchingValue);
      if (i !== -1) {
        let [k,] = entries[i];
        newHistory.push(k);
        ret.push(newHistory);
      } else {
        entries.forEach(([k, v]) => {
          _searchValue(v, newHistory.concat(k));
        });
      }
    } else {
      return null;
    }
  }
}
