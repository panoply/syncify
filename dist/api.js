'use strict';

var syncify_js = require('./syncify.js');

// syncify/api.ts
function api(resource, options) {
  if (syncify_js.isString(resource)) {
    if (resource === "watch" || resource === "build" || resource === "export" || resource === "import" || resource === "upload") {
      return (cb) => syncify_js.syncify();
    } else {
      throw new Error([
        "Invalid Resource, available resource modes via API:",
        "",
        '- "watch"',
        '- "build"',
        '- "export"',
        '- "import"',
        '- "upload"',
        ""
      ].join("\n"));
    }
  } else if (syncify_js.isObject(resource)) {
    if (!syncify_js.isUndefined(options)) {
      throw new Error("You cannot provide options when running instance");
    }
    return {
      watch: (cb) => syncify_js.syncify(),
      build: (cb) => syncify_js.syncify(),
      download: (cb) => syncify_js.syncify(),
      upload: (cb) => syncify_js.syncify()
    };
  }
}
var api_default = api;

module.exports = api_default;
