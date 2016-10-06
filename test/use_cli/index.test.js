import assert from 'assert';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';
import child_process from 'child_process';

const fs = Promise.promisifyAll(_fs);

const PLUGIN_OUT_PATH = path.resolve(__dirname, './data.json');

describe('CLI --use', () => {
  it('arguments.length === 1 when no argument', () => {
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
        assert.strictEqual(data.argsLength, 1);
      });
  });

  it('arguments.length === 1 when one argument', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', 'value',  './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
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

  it('number arg', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', '1234', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argType, 'number');
        assert.strictEqual(data.arg1, 1234);
      });
  });

  it('string arg', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', '\'value\'', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argType, 'string');
        assert.strictEqual(data.arg1, 'value');
      });
  });

  it('object arg', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', '{}', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argType, 'object');
      });
  });

  it('array arg', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', '[]', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert(Array.isArray(data.arg1));
      });
  });

  it('function arg', () => {
    return Promise
      .try(() => {
        return new Promise(done => {
          child_process.spawn('stylus', ['--use', './plugin.js', '--with', 'function() {}', './vars.styl'], {
            cwd: __dirname
          }).on('exit', () => {
            done();
          });
        });
      })
      .then(() => fs.readFileAsync(PLUGIN_OUT_PATH, 'utf8'))
      .then(json => {
        const data = JSON.parse(json);
        assert.strictEqual(data.argType, 'function');
      });
  });
});
