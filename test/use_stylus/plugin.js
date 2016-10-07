const fs = require('fs');
const path = require('path');

module.exports = function(arg1, arg2) {
  const o = {
    argsLength: arguments.length,
    argType: typeof arg1,
    arg1: arg1,
    arg2: arg2
  };
  fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(o), 'utf8');
  return function() {};
};
