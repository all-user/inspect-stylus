import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const EXEC_PLUGIN_PATH = path.resolve(__dirname, './exec-plugin.styl');

describe('evaluator', () => {
  it('this.constructor.name === \'Evaluator\'', () => {
    return Promise
      .try(() => fs.readFileAsync(EXEC_PLUGIN_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          const assertionFn = function(renderer) {
            renderer
              .define('plugin-fn', function() {
                assert.strictEqual(this.constructor.name, 'Evaluator');
                done();
              });
          };
          stylus(str)
            .set('filename', 'index.css')
            .use(assertionFn)
            .render();
        });
      });
  });

  require('./evaluator_renderer_nodes.js');
});
