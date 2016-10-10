import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const STRING_VAR_PATH = path.resolve(__dirname, './string-var.styl');
const UNIT_VAR_PATH = path.resolve(__dirname, './unit-var.styl');
const RGBA_VAR_PATH = path.resolve(__dirname, './rgba-var.styl');
const HSLA_VAR_PATH = path.resolve(__dirname, './hsla-var.styl');
const IDENT_VAR_PATH = path.resolve(__dirname, './ident-var.styl');
const CUBIC_BEZIER_VAR_PATH = path.resolve(__dirname, './cubic-bezier-var.styl');
const TUPLE_VAR_PATH = path.resolve(__dirname, './tuple-var.styl');
const LIST_VAR_PATH = path.resolve(__dirname, './list-var.styl');
const HASH_VAR_PATH = path.resolve(__dirname, './hash-var.styl');

describe('evaluator.renderer.nodes', () => {
  require('./evaluator_renderer_nodes_string.js');
  require('./evaluator_renderer_nodes_unit.js');
  require('./evaluator_renderer_nodes_rgba.js');
  require('./evaluator_renderer_nodes_hsla.js');

  it('identExpression.nodes[0].constructor === evaluator.renderer.nodes.Ident', () => {
    return new Promise(done => {
      const assertionFn = function(renderer) {
        renderer.define('plugin-fn', function() {
          const vars = this.global.scope.locals;
          assert.strictEqual(vars['ident-var'].nodes[0].constructor, this.renderer.nodes.Ident);
          done();
        });
      };
      stylus(fs.readFileSync(IDENT_VAR_PATH, 'utf8'))
        .set('filename', 'index.css')
        .use(assertionFn)
        .render();
    });
  });

  it('cubicBezierExpression.nodes[0].constructor === evaluator.renderer.nodes.Call', () => {
    return new Promise(done => {
      const assertionFn = function(renderer) {
        renderer.define('plugin-fn', function() {
          const vars = this.global.scope.locals;
          assert.strictEqual(vars['cubic-bezier-var'].nodes[0].constructor, this.renderer.nodes.Call);
          done();
        });
      };
      stylus(fs.readFileSync(CUBIC_BEZIER_VAR_PATH, 'utf8'))
        .set('filename', 'index.css')
        .use(assertionFn)
        .render();
    });
  });

  it('tupleExpression.constructor === evaluator.renderer.nodes.Expression', () => {
    return new Promise(done => {
      const assertionFn = function(renderer) {
        renderer.define('plugin-fn', function() {
          const vars = this.global.scope.locals;
          assert.strictEqual(vars['tuple-var'].constructor, this.renderer.nodes.Expression);
          done();
        });
      };
      stylus(fs.readFileSync(TUPLE_VAR_PATH, 'utf8'))
        .set('filename', 'index.css')
        .use(assertionFn)
        .render();
    });
  });

  it('listExpression.constructor === evaluator.renderer.nodes.Expression', () => {
    return new Promise(done => {
      const assertionFn = function(renderer) {
        renderer.define('plugin-fn', function() {
          const vars = this.global.scope.locals;
          assert.strictEqual(vars['list-var'].constructor, this.renderer.nodes.Expression);
          done();
        });
      };
      stylus(fs.readFileSync(LIST_VAR_PATH, 'utf8'))
        .set('filename', 'index.css')
        .use(assertionFn)
        .render();
    });
  });

  it('hashExpression.nodes[0].constructor === evaluator.renderer.nodes.Object', () => {
    return new Promise(done => {
      const assertionFn = function(renderer) {
        renderer.define('plugin-fn', function() {
          const vars = this.global.scope.locals;
          assert.strictEqual(vars['hash-var'].nodes[0].constructor, this.renderer.nodes.Object);
          done();
        });
      };
      stylus(fs.readFileSync(HASH_VAR_PATH, 'utf8'))
        .set('filename', 'index.css')
        .use(assertionFn)
        .render();
    });
  });
});
