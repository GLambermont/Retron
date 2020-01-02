import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const { MODE } = process.env;

const name = pkg.name.replace(/[^a-z]+/g, '_');
const compilationTime = (new Date()).toUTCString().replace(/GMT/g, 'UTC');
const banner = `
  /*
   * ${pkg.name} - v${pkg.version}
   * Compiled ${compilationTime}
   * 
   * ${pkg.name} is licensed under the MIT License.
   * http://www.opensource.org/licenses/mit-license
   */
`;

const globalPlugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  eslint(),
  babel({
    exclude: 'node_modules/**' 
  })
];

// Settings for different modes set with MODE option
const modeSettings = {
  production: {
    targets: ['es', 'cjs', 'iife'],
    plugins: [
      ...globalPlugins, 
      terser()
    ]
  },

  development: {
    targets: ['es'],
    plugins: globalPlugins
  }
}

// Settings for the current build
const compilationSettings = modeSettings[MODE];

export default {
  input: './src/retron.js',
  output: compilationSettings.targets.map(target => ({
    name,
    banner,
    file: `./dist/retron.${target}.js`,
    format: target,
    sourcemap: true
  })),
  plugins: compilationSettings.plugins
}