import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const TUPLE_VAR_PATH = path.resolve(__dirname, './tuple-var.styl');

describe('tuple', () => {
  let evaluator;
  let tupleExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(TUPLE_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                tupleExpression = this.global.scope.locals['tuple-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('tupleExpression.constructor === evaluator.renderer.nodes.Expression', () => {
    assert.strictEqual(tupleExpression.constructor, evaluator.renderer.nodes.Expression);
  });

  it('tupleExpression.isList === false', () => {
    assert.strictEqual(tupleExpression.isList, void 0);
  });

  it('get value from instance.nodes', () => {
    assert.strictEqual(tupleExpression.nodes[0].val, 10);
    assert.strictEqual(tupleExpression.nodes[1].val, 20);
    assert.strictEqual(tupleExpression.nodes[2].val, 30);
    assert.strictEqual(tupleExpression.nodes[3].val, 40);
  });
});
