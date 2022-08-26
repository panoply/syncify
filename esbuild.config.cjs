require('esbuild').buildSync({
  entryPoints: {
    'hot.js.liquid': 'src/hot/embed.ts'
  },
  bundle: true,
  minify: true,
  format: 'iife',
  banner: { js: '<script>' },
  footer: { js: '</script>' },
  treeShaking: true,
  write: false,
  outdir: '.'
});
