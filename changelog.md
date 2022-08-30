# Changelog

Project changelog start at version 0.8.0. All previous version should be avoided as there were less stable

<hr>

## [1.0.0-beta.3] - <small>11/12/2021</small>

- Removed `.shopifysync` config
- Enforce `package.json` config logic and throw when no `.env` file.
- Fixed the `resource` repeating config setting when executing in script.
- Added a modifier option when using callback function in `watch` mode. You can return a string or buffer and the file contents will be modified before uploading to shopify. Note, this is only available in `watch` mode. You can apply modifiers when using `upload` or `download`.
- Removed the callback option for `upload` and `download`.
- Remove Bluebird promises. Using native methods.

## [1.0.0-beta.2] - <small>01/08/2021</small>

- Fixed file delete logic
- Introduced new `package.json` configuration approach
- Provided Support for `.env` file credentials
- Minor directory changes

## [1.0.0-beta.2] - <small>01/08/2021</small>

- Upgrade the project to TypeScript
- Multiple fixes
- New logging approach and overall better performance
- Supports Shopify 2.0 store features.

Please note, this is beta release candidate, if you have issues use 0.9.2, for those most part everything should continue works as expected. You will notice the CLI logging is far more concise, and colorizes errors for better readability.

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
