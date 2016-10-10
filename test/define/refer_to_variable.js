import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const EXEC_PLUGIN_PATH = path.resolve(__dirname, './exec-plugin.styl');
const STRING_VAR_PATH = path.resolve(__dirname, './string-var.styl');
const UNIT_VAR_PATH = path.resolve(__dirname, './unit-var.styl');
const RGBA_VAR_PATH = path.resolve(__dirname, './rgba-var.styl');
const HSLA_VAR_PATH = path.resolve(__dirname, './hsla-var.styl');
const IDENT_VAR_PATH = path.resolve(__dirname, './ident-var.styl');
const CUBIC_BEZIER_VAR_PATH = path.resolve(__dirname, './cubic-bezier-var.styl');
const TUPLE_VAR_PATH = path.resolve(__dirname, './tuple-var.styl');
const LIST_VAR_PATH = path.resolve(__dirname, './list-var.styl');
const HASH_VAR_PATH = path.resolve(__dirname, './hash-var.styl');

describe('refer to variable', () => {
  it('evaluator.global.scope.locals', () => {
    return Promise
      .try(() => fs.readFileAsync(EXEC_PLUGIN_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global);
                assert.ok(this.global.scope);
                assert.ok(this.global.scope.locals);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to string var', () => {
    return Promise
      .try(() => fs.readFileAsync(STRING_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['string-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to unit var', () => {
    return Promise
      .try(() => fs.readFileAsync(UNIT_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['px-var']);
                assert.ok(this.global.scope.locals['percent-var']);
                assert.ok(this.global.scope.locals['ms-var']);
                assert.ok(this.global.scope.locals['deg-var']);
                assert.ok(this.global.scope.locals['non-unit-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to rgba var', () => {
    return Promise
      .try(() => fs.readFileAsync(RGBA_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['rgb-hex-var']);
                assert.ok(this.global.scope.locals['rgba-hex-var']);
                assert.ok(this.global.scope.locals['rgb-var']);
                assert.ok(this.global.scope.locals['rgba-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to hsla var', () => {
    return Promise
      .try(() => fs.readFileAsync(HSLA_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['hsl-var']);
                assert.ok(this.global.scope.locals['hsla-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to ident var', () => {
    return Promise
      .try(() => fs.readFileAsync(IDENT_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['ident-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to cubic-bezier var', () => {
    return Promise
      .try(() => fs.readFileAsync(CUBIC_BEZIER_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['cubic-bezier-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to tuple var', () => {
    return Promise
      .try(() => fs.readFileAsync(TUPLE_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['tuple-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to list var', () => {
    return Promise
      .try(() => fs.readFileAsync(LIST_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['list-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  it('refer to hash var', () => {
    return Promise
      .try(() => fs.readFileAsync(HASH_VAR_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.ok(this.global.scope.locals['hash-var']);
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });
});
