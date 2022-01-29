import { rollup, config, plugin, env } from '@brixtol/rollup-config';

export default rollup(
  {
    input: 'src/index.ts',
    external: [
      'anymatch',
      'axios',
      'prompts',
      'chokidar',
      'fs-extra',
      'glob',
      'minimist',
      'mkdirp',
      'nanomatch',
      'neo-blessed',
      'node-notifier',
      'node-sass',
      'sass',
      'pify',
      'terminal-kit',
      'svg-sprite',
      'svgo',
      'postcss',
      'sass-embedded',
      'yamljs',
      'html-minifier-terser',
      'kleur',
      'ansis',
      'cli-size'
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
            'config',
            'logs',
            'requests',
            'sync',
            'transform'
          ])
        }
      ),
      plugin.copy(
        {
          targets: [
            {
              src: 'assets/icon.png',
              dest: 'package'
            }
          ]
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
