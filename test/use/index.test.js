import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const SOURCE_PATH = path.resolve(__dirname, './index.styl');

describe('use', () => {
  let src;
  before(() => {
    return Promise
      .try(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => src = stylusStr);
  });

  it('this.constructor.name === \'Renderer\'', () => {
    return new Promise(done => {
      stylus(src)
        .use(function() {
          assert.strictEqual(this.constructor.name, 'Renderer');
        })
        .render(() => done());
    });
  });

  it('renderer === this', () => {
    return new Promise(done => {
      stylus(src)
        .use(function(renderer) {
          assert.strictEqual(renderer, this);
        })
        .render(() => done());
    });
  });

  it('renderer.constructor === stylus().constructor', () => {
    return new Promise(done => {
      const instance = stylus();
      stylus(src)
        .use(function(renderer) {
          assert.strictEqual(renderer.constructor, instance.constructor);
        })
        .render(() => done());
    });
  });

  it('arguments.length === 1 when no argument', () => {
    return new Promise(done => {
      stylus(src)
        .use(function() {
          assert.strictEqual(arguments.length, 1);
        })
        .render(() => done());
    });
  });
});
