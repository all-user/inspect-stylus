import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const RGBA_VAR_PATH = path.resolve(__dirname, './rgba-var.styl');

describe('evaluator.renderer.nodes.RGBA', () => {
  let evaluator;
  let rgbHexExpression;
  let rgbaHexExpression;
  let rgbExpression;
  let rgbaExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(RGBA_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                rgbHexExpression = this.global.scope.locals['rgb-hex-var'];
                rgbaHexExpression = this.global.scope.locals['rgba-hex-var'];
                rgbExpression = this.global.scope.locals['rgb-var'];
                rgbaExpression = this.global.scope.locals['rgba-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('rgbaExpression.nodes[0].constructor === evaluator.renderer.nodes.RGBA', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].constructor, evaluator.renderer.nodes.RGBA);
    assert.strictEqual(rgbaHexExpression.nodes[0].constructor, evaluator.renderer.nodes.RGBA);
    assert.strictEqual(rgbExpression.nodes[0].constructor, evaluator.renderer.nodes.RGBA);
    assert.strictEqual(rgbaExpression.nodes[0].constructor, evaluator.renderer.nodes.RGBA);
  });

  it('get red value from instance.r', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].r, 0x11);
    assert.strictEqual(rgbaHexExpression.nodes[0].r, 0x11);
    assert.strictEqual(rgbExpression.nodes[0].r, 11);
    assert.strictEqual(rgbaExpression.nodes[0].r, 11);
  });

  it('get green value from instance.g', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].g, 0x22);
    assert.strictEqual(rgbaHexExpression.nodes[0].g, 0x22);
    assert.strictEqual(rgbExpression.nodes[0].g, 22);
    assert.strictEqual(rgbaExpression.nodes[0].g, 22);
  });

  it('get blue value from instance.b', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].b, 0x33);
    assert.strictEqual(rgbaHexExpression.nodes[0].b, 0x33);
    assert.strictEqual(rgbExpression.nodes[0].b, 33);
    assert.strictEqual(rgbaExpression.nodes[0].b, 33);
  });

  it('get alpha value from instance.a', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].a, 1);
    assert.strictEqual(rgbaHexExpression.nodes[0].a, 0x44 / 0xFF);
    assert.strictEqual(rgbExpression.nodes[0].a, 1);
    assert.strictEqual(rgbaExpression.nodes[0].a, .4);
  });

  it('get raw text from instance.raw when using hexadecimal notation', () => {
    assert.strictEqual(rgbHexExpression.nodes[0].raw, '#112233');
    assert.strictEqual(rgbaHexExpression.nodes[0].raw, '#11223344');
    assert.strictEqual(rgbExpression.nodes[0].raw, void 0);
    assert.strictEqual(rgbaExpression.nodes[0].raw, void 0);
  });

  it('new evaluator.renderer.nodes.RGBA(r, g, b, a)', () => {
    const rgba = new evaluator.renderer.nodes.RGBA(1, 2, 3, .4);
    assert.strictEqual(rgba.r, 1);
    assert.strictEqual(rgba.g, 2);
    assert.strictEqual(rgba.b, 3);
    assert.strictEqual(rgba.a, .4);
  });
});
