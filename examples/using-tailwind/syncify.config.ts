import { defineConfig } from '@syncify/cli';

export default defineConfig(
  {
    transform: {
      style: {
        'assets/stylesheet.css': {
          input: 'assets/style/base.css',
          tailwind: true
        }
      }
    },
    processors: {
      postcss: [
        require('autoprefixer')
      ]
    }
  }
);
