import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const IDENT_VAR_PATH = path.resolve(__dirname, './ident-var.styl');

describe('evaluator.renderer.nodes.Ident', () => {
  let evaluator;
  let identExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(IDENT_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                identExpression = this.global.scope.locals['ident-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('identExpression.nodes[0].constructor === evaluator.renderer.nodes.Ident', () => {
    assert.strictEqual(identExpression.nodes[0].constructor, evaluator.renderer.nodes.Ident);
  });

  it('get value from instance.name', () => {
    assert.strictEqual(identExpression.nodes[0].name, 'auto');
  });

  it('get value from instance.string', () => {
    assert.strictEqual(identExpression.nodes[0].string, 'auto');
  });
});
