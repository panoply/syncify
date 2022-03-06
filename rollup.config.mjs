import { rollup, config, plugin, env } from '@brixtol/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    external: [
      'anymatch',
      'axios',
      'chokidar',
      '@web/config-loader',
      'cross-spawn',
      'dotenv',
      'gray-matter',
      'fast-safe-stringify',
      'fs-extra',
      'glob',
      'highlight.js',
      'html-minifier-terser',
      'minimist',
      'marked',
      'prompts',
      'yamljs',
      'browser-sync',
      'postcss',
      'sass',
      'svg-sprite',
      'svgo',
      'turndown',
      'turndown-plugin-gfm',
      'remark-parse',
      'rehype-stringify',
      'remark-rehype',
      'unified'
    ],
    output: [
      {
        format: 'es',
        file: 'package/index.mjs',
        sourcemap: 'hidden',
        preferConst: true,
        esModule: true,
        exports: 'named',
        chunkFileNames: '[name].js',
        inlineDynamicImports: true,
        plugins: env.is('prod', [
          plugin.esminify(),
          plugin.filesize(
            {
              showGzippedSize: false,
              showMinifiedSize: true
            }
          )
        ])
      },
      {
        format: 'cjs',
        file: 'package/index.js',
        sourcemap: 'hidden',
        preferConst: true,
        esModule: false,
        exports: 'named',
        chunkFileNames: '[name].js',
        inlineDynamicImports: true,
        plugins: env.is('prod', [
          plugin.esminify(),
          plugin.filesize(
            {
              showGzippedSize: false,
              showMinifiedSize: true
            }
          )
        ])
      }
    ],
    plugins: [
      plugin.del(
        {
          verbose: true,
          runOnce: true,
          targets: 'package/*'
        }
      ),
      plugin.alias(
        {
          customResolver: plugin.resolve({
            extensions: [ '.ts' ]
          }),
          entries: config.alias([
            'cli',
            'options',
            'shared',
            'process',
            'requests',
            'modes',
            'transform'
          ])
        }
      ),
      plugin.replace(
        {
          preventAssignment: true,
          delimiters: [ '<!', '!>' ],
          values: {
            version: config.package.version
          }
        }
      ),
      plugin.json(),
      plugin.esbuild(
        {
          loaders: {
            '.json': 'json'
          }
        }
      ),
      plugin.resolve(
        {
          preferBuiltins: true,
          extensions: [ '.ts', '.js' ]
        }
      ),
      plugin.commonjs(
        {
          requireReturnsDefault: 'auto',
          extensions: [ '.ts', '.js' ]
        }
      ),
      plugin.beep()
    ]
  }
);
