import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default {

  input: './lib/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    sourcemap: false
  },
  plugins: [
    babel({ runtimeHelpers: true }),
    terser()
  ]

}
