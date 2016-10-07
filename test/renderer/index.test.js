import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const SOURCE_PATH = path.resolve(__dirname, './index.styl');

describe('Renderer', () => {
  it('arguments.length === 1', () => {
    return Promise
      .try(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => {
        stylus(stylusStr)
          .use(function() {
            assert.strictEqual(arguments.length, 1);
          })
          .render(() => {});
      });
  });

  it('renderer === this', () => {
    return Promise
      .try(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => {
        stylus(stylusStr)
          .use(function(renderer) {
            assert.strictEqual(renderer, this);
          })
          .render(() => {});
      });
  });

  it('renderer.constructor === stylus().constructor', () => {
    return Promise
      .try(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => {
        const instance = stylus();
        stylus(stylusStr)
          .use(function(renderer) {
            assert.strictEqual(renderer.constructor, instance.constructor);
          })
          .render(() => {});
      });
  });
});
