import sass from 'rollup-plugin-sass';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import gzip from 'rollup-plugin-gzip'

const createConfig = targets => {
  return {
    input: 'src/js/retron.js',
    output: targets.map(target => {
      return {
        file: `lib/retron.${target}.min.js`,
        format: target,
        name: 'retron',
        sourcemap: true
      }; 
    }),
    plugins: [
      sass({ insert: true }),
      eslint(),
      babel({ exclude: 'node_modules/**' }),
      terser(), // Using terser instead of uglify because of es6 output
      gzip({
        minSize: 8192 
      })
    ]
  }
};

export { createConfig };