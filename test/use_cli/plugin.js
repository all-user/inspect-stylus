const fs = require('fs');
const path = require('path');

module.exports = function() {
  const o = { result: arguments.length };
  fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(o), 'utf8');
  return function() {};
};
