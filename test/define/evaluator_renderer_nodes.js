import assert from 'assert';
import Promise from 'bluebird';
import stylus from 'stylus';
import path from 'path';
import _fs from 'fs';

const fs = Promise.promisifyAll(_fs);

const STRING_VAR_PATH = path.resolve(__dirname, './string-var.styl');
const UNIT_VAR_PATH = path.resolve(__dirname, './unit-var.styl');
const RGBA_VAR_PATH = path.resolve(__dirname, './rgba-var.styl');
const HSLA_VAR_PATH = path.resolve(__dirname, './hsla-var.styl');
const IDENT_VAR_PATH = path.resolve(__dirname, './ident-var.styl');
const CUBIC_BEZIER_VAR_PATH = path.resolve(__dirname, './cubic-bezier-var.styl');
const TUPLE_VAR_PATH = path.resolve(__dirname, './tuple-var.styl');
const LIST_VAR_PATH = path.resolve(__dirname, './list-var.styl');
const HASH_VAR_PATH = path.resolve(__dirname, './hash-var.styl');

describe('evaluator.renderer.nodes', () => {
  require('./evaluator_renderer_nodes_string.js');
  require('./evaluator_renderer_nodes_unit.js');
  require('./evaluator_renderer_nodes_rgba.js');
  require('./evaluator_renderer_nodes_hsla.js');
  require('./evaluator_renderer_nodes_ident.js');
  require('./evaluator_renderer_nodes_cubic-bezier.js');
  require('./evaluator_renderer_nodes_tuple.js');
  require('./evaluator_renderer_nodes_list.js');
  require('./evaluator_renderer_nodes_hash.js');
});
