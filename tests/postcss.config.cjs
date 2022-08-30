
module.exports = {
  plugins: [
    require('postcss-map-get')(),
    require('postcss-nested')(),
    require('postcss-sort-media-queries')(),
    require('postcss-assets')({ loadPaths: [ 'src/images/' ] }),
    require('autoprefixer')()
  ]
};
