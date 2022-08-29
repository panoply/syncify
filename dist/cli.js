#!/usr/bin/env node
'use strict';

var cjs_js = require('./cjs.js');
var s = require('minimist');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var s__default = /*#__PURE__*/_interopDefaultLegacy(s);

cjs_js.e(s__default["default"](process.argv.slice(1),{alias:{config:"c",build:"b",watch:"w",upload:"u",download:"d",theme:"t",input:"i",output:"o",help:"h",metafields:"m",pages:"p",redirects:"r",filter:"f",spawn:"s",delete:"del"},default:{cwd:process.cwd(),config:".",input:"source",output:"theme",import:"import",export:"export",cli:!0,dev:!0,prod:!1,hot:!1,help:!1,setup:!1,strap:!1,silent:!1,minify:!1,script:!1,style:!1,svg:!1,image:!1},boolean:["vsc","dev","prod","hot","build","prompt","watch","upload","setup","server","metafields","pages","redirects","download","clean","silent","help","pull","push","minify","script","style","svg","image"],string:["theme","config","input","output","export","import","strap","filter","spawn","del","bump"]})).catch(cjs_js.a);
