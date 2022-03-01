const { pathExistsSync, mkdirSync, writeJsonSync, readJSONSync } = require('fs-extra');
const { join } = require('path');

/**
 * Current Working Directory
 */
const cwd = process.cwd();

/**
 * Package JSON
 */
const pkg = readJSONSync(join(cwd, 'package.json'));

/**
 * Syncify Cache Directory
 */
const path = join(cwd, 'node_modules/.syncify');

/**
 * Sub-directories to generate
 */
const dirs = [
  'styles',
  'icons',
  'metafields',
  'pages',
  'sections',
  'redirects',
  'vscode'
];

/**
 * Cache JSON reference
 */
const refs = {
  syncify: pkg.version,
  created: Date.now(),
  updated: Date.now()
};

/* -------------------------------------------- */
/* LOGIC                                        */
/* -------------------------------------------- */

if (!pathExistsSync(path)) {

  try {
    mkdirSync(path);
  } catch (e) {
    throw new Error(e);
  }

}

while (dirs.length !== 0) {

  const name = dirs.shift();
  const uri = join(path, name);

  if (!pathExistsSync(uri)) {
    try {
      mkdirSync(uri);
    } catch (e) {
      throw new Error(e);
    }
  }

  refs[name] = { uri, maps: {} };

}

writeJsonSync(join(path, 'store.map'), refs, { spaces: 0 });
