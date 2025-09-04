import type { ProcessorsBundle } from 'types';

/**
 * Processor Configuration
 *
 * This model is the default options for the transform processors.
 */
export const processor = (): ProcessorsBundle => ({
  tailwind: {
    installed: false,
    loaded: false,
    file: false,
    map: null,
    config: null
  },
  sass: {
    loaded: false,
    config: {
      warnings: true,
      style: 'compressed',
      sourcemap: true,
      quietDeps: false,
      fatalDeprecations: [],
      functions: {},
      futureDeprecations: [],
      silenceDeprecations: [],
      include: [ 'node_modules' ]
    }
  },
  esbuild: {
    tsconfig: undefined,
    bundle: true,
    format: 'esm',
    globalName: undefined,
    target: 'es2016',
    metafile: true,
    external: [],
    platform: 'browser',
    splitting: false,
    sourcemap: 'linked',
    write: false,
    logLevel: 'silent',
    plugins: []
  },
  postcss: {
    file: false,
    config: []
  },
  svgo: {
    multipass: true,
    js2svg: {
      indent: 2,
      pretty: true
    },
    plugins: [
      'preset-default'
    ]
  }
});
