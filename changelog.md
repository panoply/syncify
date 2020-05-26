# Changelog

Project changelog start at version 0.8.0. All previous version should be avoided as there were less stable

<hr>

## [0.9.0] - <small>25/05/2020</small>

The most important changes in this release is the removal of Yarn in favour of th powerful [pnpm](https://pnpm.js.org/en/cli/install) package manager and the log interface

- Overhaul of upload and download cli logging
- Now uses [fs-extra](https://www.npmjs.com/package/fs-extra)
- [#6](https://github.com/panoply/shopify-sync/issues/6)

### Misc

- Update documentation
- Boycotted Yarn in favour of [pnpm](https://pnpm.js.org/en/cli/install)
- Various dependencies updated

<hr>

## [0.8.1] - <small>17/02/2020</small>

- Tidy up some test logs
- Imporve documentation
- Add some dev dependencies

<hr>

## [0.8.0] - <small>17/02/2020</small>

- Better Logging and clear informative response messages
- Support Upload callbacks
- Provide IntelliSense schema JSON
- Provide Buffer of file contents in callback
- Support `.shopifysync.json` configuraiton file
- Improve documentation and examples
- Add Babel and some additional next-gen transformations
- Fix ignored files uploading issues
