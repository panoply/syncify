import { defineConfig } from '@syncify/cli';

export default defineConfig(
  {
    input: 'source',
    transform: {
      script: {
        input: './source/assets/*.js',
        esbuild: {
          treeShaking: false,
          minify: false,
          minifyWhitespace: true,
          minifySyntax: true,
          minifyIdentifiers: false
        }
      },
      style: {
        input: 'source/assets/base.css',
        rename: '[file].min'
      },
      svg: {
        input: 'source/assets/icons/*.svg',
        snippet: true,
        rename: 'icon.[file]'
      },
      liquid: {
        terse: true
      }
    },
    processors: {
      postcss: [
        require('autoprefixer')
      ]
    }
  }
);
