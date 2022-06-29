import bs from 'browser-sync';
import { IConfig } from 'types';
import { join } from 'path';

export function server (proxy: string, config: IConfig) {

  return bs.init({
    proxy: {
      target: proxy
    },
    files: [
      join(config.output, 'assets')
    ],
    serveStatic: [ join(config.cache, '*.map') ],
    notify: false,
    open: false,
    reloadOnRestart: true,
    ui: { port: 4000 },
    snippetOptions: {
      rule: {
        match: /<\/head>/,
        fn: (snippet, match) => snippet + match
      }
    },
    rewriteRules: [
      {
        match: /(<link href=)(.*?)\/\/(cdn.shopify.com)(.*?)(stylesheet.css)/,
        fn: () => '<link href="/stylesheet.css'
      },
      {
        match: /(?:<script defer(.*?)src="\/\/cdn.shopify.com.*?\/bundle\.js)/,
        fn: () => '<script defer src="/bundle.js'
      },
      {
        match: /<iframe\s*title="Preview Bar"/,
        fn: () => '<iframe style="display: none !important"'
      }
    ]
  });
}