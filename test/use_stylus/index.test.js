import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';
import child_process from 'child_process';

const fs = Promise.promisifyAll(_fs);

const ARG0_PATH = path.resolve(__dirname, './arg0.styl');
const ARG1_PATH = path.resolve(__dirname, './arg1.styl');
const ARG2_PATH = path.resolve(__dirname, './arg2.styl');
const ARG_STRING_PATH = path.resolve(__dirname, './arg_string.styl');
const PLUGIN_OUT_PATH = path.resolve(__dirname, './data.json');

describe('stylus use(path)', () => {
  it('arguments.length === 1 when no argument', () => {
    return Promise
      .try(() => fs.readFileAsync(ARG0_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          stylus(str)
            .set('filename', 'index.css')
            .render(err => {
              if (err) fail(err);
              done();
            });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argsLength, 1);
      });
  });

  it('arguments.length === 1 when one argument', () => {
    return Promise
      .try(() => fs.readFileAsync(ARG1_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          stylus(str)
            .set('filename', 'index.css')
            .render(err => {
              if (err) fail(err);
              done();
            });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argsLength, 1);
      });
  });

  it('arguments.length === 1 when two argument', () => {
    return Promise
      .try(() => fs.readFileAsync(ARG2_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          stylus(str)
            .set('filename', 'index.css')
            .render(err => {
              if (err) fail(err);
              done();
            });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argsLength, 1);
      });
  });

  it('non hash arg', () => {
    return Promise
      .try(() => fs.readFileAsync(ARG_STRING_PATH, 'utf8'))
      .then(str => {
        return new Promise(done => {
          stylus(str)
            .set('filename', 'index.css')
            .render(err => {
              assert.notStrictEqual(err, void 0);
              done();
            });
        });
      });
  });

  it('arg is JS object', () => {
    return Promise
      .try(() => fs.readFileAsync(ARG1_PATH, 'utf8'))
      .then(str => {
        return new Promise((done, fail) => {
          stylus(str)
            .set('filename', 'index.css')
            .render(err => {
              if (err) fail(err);
              done();
            });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.deepEqual(data.arg1, { key: 'value' });
      });
  });
});
