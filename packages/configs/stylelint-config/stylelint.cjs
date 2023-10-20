/**
 * Stylint Config
 *
 * @type {import('stylelint').Config}
 */
module.exports = {
  plugins: [ 'stylelint-scss' ],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order'
  ],
  ignoreFiles: [
    '**/*.liquid'
  ],
  rules: {
    indentation: 2,
    'string-quotes': 'double',
    'comment-whitespace-inside': 'always',
    'scss/dollar-variable-empty-line-before': null,
    'at-rule-empty-line-before': 'always',
    'selector-class-pattern': '^[0-9a-zA-Z_-]+$',
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': [
      'always',
      {
        ignore: [ 'stylelint-commands', 'after-comment' ]
      }
    ],
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'declaration-colon-space-after': 'always',
    'max-empty-lines': 2,
    'block-opening-brace-newline-after': 'always-multi-line',
    'rule-empty-line-before': [
      'always',
      {
        except: [ 'first-nested' ],
        ignore: [ 'after-comment' ]
      }
    ]
  }
};
