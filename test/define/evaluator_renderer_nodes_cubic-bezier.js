import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const CUBIC_BEZIER_VAR_PATH = path.resolve(__dirname, './cubic-bezier-var.styl');

describe('evaluator.renderer.nodes.Call', () => {
  let evaluator;
  let cubicBezierExpression;
  before(() => {
    return new Promise(done => {
      Promise
        .try(() => fs.readFileAsync(CUBIC_BEZIER_VAR_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .set('filename', 'index.css')
            .use(renderer => {
              renderer.define('plugin-fn', function() {
                evaluator = this;
                cubicBezierExpression = this.global.scope.locals['cubic-bezier-var'];
                done();
              });
            })
            .render();
        });
    });
  });

  it('cubicBezierExpression.nodes[0].constructor === evaluator.renderer.nodes.Call', () => {
    assert.strictEqual(cubicBezierExpression.nodes[0].constructor, evaluator.renderer.nodes.Call);
  });

  it('cubicBezierExpression.nodes[0].args.constructor === evaluator.renderer.nodes.Arguments', () => {
    assert.strictEqual(cubicBezierExpression.nodes[0].args.constructor, evaluator.renderer.nodes.Arguments);
  });

  it('get name from instance.name', () => {
    assert.strictEqual(cubicBezierExpression.nodes[0].name, 'cubic-bezier');
  });

  it('get arguments from instance.args', () => {
    assert.strictEqual(cubicBezierExpression.nodes[0].args.nodes[0].nodes[0].val, 1);
    assert.strictEqual(cubicBezierExpression.nodes[0].args.nodes[1].nodes[0].val, 0);
    assert.strictEqual(cubicBezierExpression.nodes[0].args.nodes[2].nodes[0].val, 1);
    assert.strictEqual(cubicBezierExpression.nodes[0].args.nodes[3].nodes[0].val, 0);
  });

  it('new evaluator.renderer.nodes.Call(name, args)', () => {
    const args = new evaluator.renderer.nodes.Expression();
    for (let i = 0; i < 4; i++) {
      args.push(new evaluator.renderer.nodes.Unit(1));
    }
    const call = new evaluator.renderer.nodes.Call('cubic-bezier', args);
    assert.strictEqual(call.name, 'cubic-bezier');
    assert.strictEqual(call.args.nodes[0].val, 1);
    assert.strictEqual(call.args.nodes[1].val, 1);
    assert.strictEqual(call.args.nodes[2].val, 1);
    assert.strictEqual(call.args.nodes[3].val, 1);
  });
});
