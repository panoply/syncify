/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import type { TerserConfig } from 'types';

/**
 * Terser Configuration
 *
 * This model represents minification terser configuration options and settings.
 * Terser is optional, only when a user has defined or informed they want minification
 * processing will this model be used.
 */
export const terser = (): TerserConfig => ({
  json: {
    assets: true,
    config: true,
    locales: true,
    metafields: true,
    metaobject: true,
    groups: true,
    templates: true,
    exclude: []
  },
  script: {
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    mangleProps: undefined,
    legalComments: 'none',
    mangleQuoted: false,
    keepNames: false,
    exclude: []
  },
  liquid: {
    minifyJavascript: false,
    minifyStylesheet: false,
    minifyStyle: true,
    minifySchema: true,
    removeComments: true,
    collapseInner: false,
    collapseWhitespace: true,
    stripDashes: true,
    exclude: []
  },
  style: {
    exclude: [],
    format: false,
    inline: false,
    purgeUnusedCSS: false,
    obfuscateAlphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
    obfuscateClassNames: false,
    obfuscateWhitelist: []
  },
  markup: {
    caseSensitive: false,
    collapseBooleanAttributes: false,
    collapseInlineTagWhitespace: false,
    conservativeCollapse: false,
    keepClosingSlash: false,
    noNewlinesBeforeTagClose: false,
    preventAttributesEscaping: false,
    removeEmptyAttributes: false,
    removeEmptyElements: false,
    removeOptionalTags: false,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: false,
    collapseWhitespace: true,
    continueOnParseError: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    trimCustomFragments: false,
    ignoreCustomFragments: [
      /(?<=\bstyle\b=["']\s?)[\s\S]*?(?="[\s\n>]?)/,
      /<style[\s\S]*?<\/style>/,
      /<script[\s\S]*?<\/script>/,
      /{%[\s\S]*?%}/
    ]
  }
});
