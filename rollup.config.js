import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'

export default {

  input: 'lib/Entry.js',
  output: {
    file: './index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    terser()
  ]

}
