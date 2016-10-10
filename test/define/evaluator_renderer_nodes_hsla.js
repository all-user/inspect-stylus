import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const HSLA_VAR_PATH = path.resolve(__dirname, './hsla-var.styl');

describe('evaluator.renderer.nodes.HSLA', () => {
  let evaluator;
  let hslExpression;
  let hslaExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(HSLA_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                hslExpression = this.global.scope.locals['hsl-var'];
                hslaExpression = this.global.scope.locals['hsla-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('hslaExpression.nodes[0].constructor === evaluator.renderer.nodes.HSLA', () => {
    assert.strictEqual(hslExpression.nodes[0].constructor, evaluator.renderer.nodes.HSLA);
    assert.strictEqual(hslaExpression.nodes[0].constructor, evaluator.renderer.nodes.HSLA);
  });

  it('get hue value from instance.h', () => {
    assert.strictEqual(hslExpression.nodes[0].h, 11);
    assert.strictEqual(hslaExpression.nodes[0].h, 11);
  });

  it('get saturation value from instance.s', () => {
    assert.strictEqual(hslExpression.nodes[0].s, 22);
    assert.strictEqual(hslaExpression.nodes[0].s, 22);
  });

  it('get lightness value from instance.l', () => {
    assert.strictEqual(hslExpression.nodes[0].l, 33);
    assert.strictEqual(hslaExpression.nodes[0].l, 33);
  });

  it('get alpha value from instance.a', () => {
    assert.strictEqual(hslExpression.nodes[0].a, 1);
    assert.strictEqual(hslaExpression.nodes[0].a, .4);
  });
});
