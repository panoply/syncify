import type { ProcessorsBundle } from 'types';

/**
 * Processor Configuration
 *
 * This model is the default options for the transform processors.
 */
export const processor = (): ProcessorsBundle => ({
  json: {
    indent: 2,
    useTab: false,
    crlf: false,
    exclude: null
  },
  tailwind: {
    installed: false,
    loaded: false,
    file: false,
    map: null,
    config: null
  },
  sass: {
    installed: false,
    loaded: false,
    file: false,
    config: {
      warnings: true,
      style: 'compressed',
      sourcemap: true,
      quietDeps: false,
      include: [ 'node_modules' ]
    }
  },
  esbuild: {
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
  sharp: {
    installed: false,
    required: false,
    loaded: false,
    file: false,
    config: {}
  },
  postcss: {
    file: false,
    config: []
  },
  sprite: {
    mode: {
      inline: true,
      symbol: {
        example: false
      }
    },
    shape: {
      transform: [ 'svgo' ],
      id: {
        generator: 'svg-%s'
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      dimensionAttributes: false,
      namespaceClassnames: false,
      namespaceIDs: false
    }
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
