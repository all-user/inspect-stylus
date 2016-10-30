import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const HASH_VAR_PATH = path.resolve(__dirname, './hash-var.styl');

describe('hash', () => {
  let evaluator;
  let hashExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(HASH_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                hashExpression = this.global.scope.locals['hash-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('hashExpression.nodes[0].constructor === evaluator.renderer.nodes.Object', () => {
    assert.strictEqual(hashExpression.nodes[0].constructor, evaluator.renderer.nodes.Object);
  });

  it('get value from instance.vals', () => {
    assert.strictEqual(hashExpression.nodes[0].vals.foo.nodes[0].val, 1);
  });

  it('evaluator.renderer.nodes.Object.prototype.set(key, value)', () => {
    const obj = new evaluator.renderer.nodes.Object();
    obj.set('foo', new evaluator.renderer.nodes.String('bar'));
    assert.strictEqual(obj.vals.foo.string, 'bar');
    assert.strictEqual(obj.vals.foo.val, 'bar');
  });

});
