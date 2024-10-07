import { defineConfig } from '@syncify/cli';

export default defineConfig(
  {
    transform: {
      style: {
        'assets/[name].min': {
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
