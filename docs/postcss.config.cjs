const purge = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default'
    }),
    purge(
      {
        variables: true,
        content: [
          'public/**/*.html',
          'public/**/*.js'
        ]
      }
    )
  ]
};
