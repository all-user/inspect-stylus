import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';
import child_process from 'child_process';

const fs = Promise.promisifyAll(_fs);

const PLUGIN_OUT_PATH = path.resolve(__dirname, './data.json');

describe('CLI --use', () => {
  it('arguments.length', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.deepEqual(data.result, 1);
      });
  });
});
