# Changelog

Project changelog start at version 0.8.0. All previous version should be avoided as there were less stable

<hr>

## [0.9.2] - <small>07/08/2020</small>

- Fix #8

## [0.9.1] - <small>03/08/2020</small>

- Fix ignore issue, in watch mode
- Move the distributed file into package directory

### Notes

There is a lot of changes shipping in the first major release, due to go out before the end of the year. It will include avajs tests, official relase versions and a bunch of goodies the help with Shopify theme development.

## [0.9.0] - <small>25/05/2020</small>

The most important changes in this release is the removal of Yarn in favour of the powerful [pnpm](https://pnpm.js.org/en/cli/install) package manager and the log interface. This version patches some issues and additionals. Next version will be this packages first major release.

- Overhaul of upload and download cli logging
- Now uses [fs-extra](https://www.npmjs.com/package/fs-extra)
- [#6](https://github.com/panoply/shopify-sync/issues/6)
- Dropped CLI `--filter` and `--target` arguments due to pnpm namespace issue, will shop fix in next major
- Tidy up some parts of code base
- No longer supports `.shopifysync` file, you must use `.shopifysync.json`
- Implemented a more user friendly logging approach for upload and download features.

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
