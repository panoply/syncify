#!/usr/bin/env node
'use strict';

var cjs_js = require('./cjs.js');
var process$1 = require('process');
var a = require('minimist');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var a__default = /*#__PURE__*/_interopDefault(a);

cjs_js.e(a__default.default(process$1.argv.slice(1),{alias:{config:"c",input:"i",output:"o",build:"b",watch:"w",upload:"u",download:"d",theme:"t",help:"h",spawn:"s",filter:"f",delete:"del"},default:{cwd:process.cwd(),config:".",input:"source",cli:!0,dev:!0,prod:!1,import:!1,export:!1,build:!1,watch:!1,upload:!1,download:!1,terse:!1,hot:!1,help:!1,interactive:!1,views:!1,script:!1,style:!1,svg:!1,image:!1,metafields:!1,pages:!1,redirects:!1,clean:!1,silent:!1,force:!1,setup:!1,strap:!1},boolean:["build","watch","download","upload","import","export","hot","terse","help","interactive","dev","prod","metafields","pages","redirects","clean","silent","pull","force","test","vsc","strap","views","script","style","svg","image"],string:["input","output","config","theme","spawn","del","bump","filter","strap"]})).catch(cjs_js.a.throws);
