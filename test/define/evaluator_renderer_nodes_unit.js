import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const UNIT_VAR_PATH = path.resolve(__dirname, './unit-var.styl');

describe('evaluator.renderer.nodes.Unit', () => {
  let evaluator;
  let pxExpression;
  let percentExpression;
  let msExpression;
  let degExpression;
  let nonUnitExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(UNIT_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                pxExpression = this.global.scope.locals['px-var'];
                percentExpression = this.global.scope.locals['percent-var'];
                msExpression = this.global.scope.locals['ms-var'];
                degExpression = this.global.scope.locals['deg-var'];
                nonUnitExpression = this.global.scope.locals['non-unit-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('unitExpression.nodes[0].constructor === evaluator.renderer.nodes.Unit', () => {
    assert.strictEqual(pxExpression.nodes[0].constructor, evaluator.renderer.nodes.Unit);
    assert.strictEqual(percentExpression.nodes[0].constructor, evaluator.renderer.nodes.Unit);
    assert.strictEqual(msExpression.nodes[0].constructor, evaluator.renderer.nodes.Unit);
    assert.strictEqual(degExpression.nodes[0].constructor, evaluator.renderer.nodes.Unit);
    assert.strictEqual(nonUnitExpression.nodes[0].constructor, evaluator.renderer.nodes.Unit);
  });

  it('get value from instance.val', () => {
    assert.strictEqual(pxExpression.nodes[0].val, 20);
    assert.strictEqual(percentExpression.nodes[0].val, 50);
    assert.strictEqual(msExpression.nodes[0].val, 300);
    assert.strictEqual(degExpression.nodes[0].val, 120);
    assert.strictEqual(nonUnitExpression.nodes[0].val, 365);
  });

  it('get unit from instance.type', () => {
    assert.strictEqual(pxExpression.nodes[0].type, 'px');
    assert.strictEqual(percentExpression.nodes[0].type, '%');
    assert.strictEqual(msExpression.nodes[0].type, 'ms');
    assert.strictEqual(degExpression.nodes[0].type, 'deg');
    assert.strictEqual(nonUnitExpression.nodes[0].type, void 0);
  });

  it('new evaluator.renderer.nodes.Unit(val, type)', () => {
    const px = new evaluator.renderer.nodes.Unit(20, 'px');
    assert.strictEqual(px.val, 20);
    assert.strictEqual(px.type, 'px');
  });
});
