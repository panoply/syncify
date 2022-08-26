import syncify, { style, icons, json, markdown, sections } from './jsapi';

export default syncify(
  {
    input: 'src',
    output: 'theme',
    export: 'export',
    import: 'import',
    scripts: '.',
    paths: {
      assets: 'assets/**/*',
      config: 'schema/config/*.json',
      locales: 'schema/locales/*.json',
      layout: 'views/theme.liquid',
      sections: 'views/sections/**/*.liquid',
      metafields: 'metafields/**/*.json',
      redirects: 'redirects.yaml',
      customers: [
        'views/templates/customers/*.json',
        'views/templates/customers/*.liquid'
      ],
      pages: [
        'pages/*.md',
        'pages/*.html'
      ],
      templates: [
        'views/templates/*.json',
        'views/templates/*.liquid'
      ],
      snippets: [
        'views/snippets',
        'scripts/vars.js.liquid',
        'styles/vars.css.liquid'
      ]
    },
    spawn: {
      rollup: 'rollup -c'
    },
    stores: {
      domain: 'your-store',
      themes: {
        dev: 123456789,
        prod: 123456789
      }
    },
    minify: {
      minifyJSON: true,
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true,
      continueOnParseError: true,
      removeComments: true,
      removeLiquidComments: true,
      removeLiquidNewlineAttributes: true,
      removeLiquidRedundantWhitespaceDashes: true,
      trimCustomFragments: true,
      ignoreCustomFragments: [],
      ignoreLiquidTags: []
    },
    transform: [
      sections(
        {
          prefix: true,
          duplicatesOnly: false,
          prefixSeparator: '-',
          globals: [
            'layout'
          ]
        }
      ),
      style(
        [
          {
            input: '',
            snippet: false,
            include: [],
            postcss: true,
            sass: {
              sourcemap: true,
              style: 'expanded',
              warnings: false
            }
          }
        ]
      ),
      json(
        {
          spaces: 2,
          exclude: []
        }
      ),
      markdown(
        {
          baseUrl: '',
          breaks: true,
          headerIds: true,
          headerPrefix: '',
          mangle: true,
          silent: true,
          smartypants: false
        }
      ),
      icons(
        {
          snippets: [ ],
          sprites: [
            {
              input: '',
              output: '',
              options: {
                dimensionAttributes: true,
                namespaceClassnames: true,
                namespaceIDS: false,
                rootAttributes: {
                  id: 'foo'
                }
              }
            }
          ]
        }
      )
    ]
  }
);
