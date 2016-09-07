exports = module.exports = function() {
  return function(stylus) {
    console.log(this.evaluator.global.scope.locals['$grid']);
  };
};
