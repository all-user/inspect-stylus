import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const LIST_VAR_PATH = path.resolve(__dirname, './list-var.styl');

describe('list', () => {
  let evaluator;
  let listExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(LIST_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                listExpression = this.global.scope.locals['list-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('listExpression.constructor === evaluator.renderer.nodes.Expression', () => {
    assert.strictEqual(listExpression.constructor, evaluator.renderer.nodes.Expression);
  });

  it('listExpression.isList === true', () => {
    assert.strictEqual(listExpression.isList, true);
  });

  it('get value from instance.nodes', () => {
    assert.strictEqual(listExpression.nodes[0].nodes[0].val, 1);
    assert.strictEqual(listExpression.nodes[1].nodes[0].val, 2);
    assert.strictEqual(listExpression.nodes[2].nodes[0].val, 3);
    assert.strictEqual(listExpression.nodes[3].nodes[0].val, 4);
  });

  it('new evaluator.renderer.nodes.Expression(isList)', () => {
    const list = new evaluator.renderer.nodes.Expression(true);
    const px = new evaluator.renderer.nodes.Unit(20, 'px');
    list.push(px);
    assert.strictEqual(list.isList, true);
    assert.strictEqual(list.nodes[0].val, 20);
    assert.strictEqual(list.nodes[0].type, 'px');
  });
});
