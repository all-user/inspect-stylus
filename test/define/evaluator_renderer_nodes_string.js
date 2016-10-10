import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const STRING_VAR_PATH = path.resolve(__dirname, './string-var.styl');

describe('evaluator.renderer.nodes.String', () => {
  let evaluator;
  let stringExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(STRING_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                stringExpression = this.global.scope.locals['string-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('stringExpression.nodes[0].constructor === evaluator.renderer.nodes.String', () => {
    assert.strictEqual(stringExpression.nodes[0].constructor, evaluator.renderer.nodes.String);
  });

  it('get value from instance.string', () => {
    assert.strictEqual(stringExpression.nodes[0].string, 'some string');
  });

  it('get value from instance.val', () => {
    assert.strictEqual(stringExpression.nodes[0].val, 'some string');
  });
});
