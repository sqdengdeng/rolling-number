import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    }),
    postcss({
      plugins: [autoprefixer()]
    }),
    terser()
  ]
};
