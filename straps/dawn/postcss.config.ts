import { env } from '@syncify/cli';

const plugins = [ require('autoprefixer') ];

if (env.prod) {
  plugins.push(require('cssnano'));
}

module.exports = { plugins };
