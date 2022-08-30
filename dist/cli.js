#!/usr/bin/env node
'use strict';

var cjs_js = require('./cjs.js');
var mm = require('minimist');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mm__default = /*#__PURE__*/_interopDefaultLegacy(mm);

cjs_js.run(mm__default["default"](process.argv.slice(1), {
  alias: {
    config: "c",
    build: "b",
    watch: "w",
    upload: "u",
    download: "d",
    theme: "t",
    input: "i",
    output: "o",
    help: "h",
    metafields: "m",
    pages: "p",
    redirects: "r",
    filter: "f",
    spawn: "s",
    delete: "del"
  },
  default: {
    cwd: process.cwd(),
    config: ".",
    input: "source",
    output: "theme",
    import: "import",
    export: "export",
    cli: true,
    dev: true,
    prod: false,
    hot: false,
    help: false,
    setup: false,
    strap: false,
    silent: false,
    minify: false,
    script: false,
    style: false,
    svg: false,
    image: false
  },
  boolean: [
    "vsc",
    "dev",
    "prod",
    "hot",
    "build",
    "prompt",
    "watch",
    "upload",
    "setup",
    "server",
    "metafields",
    "pages",
    "redirects",
    "download",
    "clean",
    "silent",
    "help",
    "pull",
    "push",
    "minify",
    "script",
    "style",
    "svg",
    "image"
  ],
  string: [
    "theme",
    "config",
    "input",
    "output",
    "export",
    "import",
    "strap",
    "filter",
    "spawn",
    "del",
    "bump"
  ]
})).catch(cjs_js.throws);
