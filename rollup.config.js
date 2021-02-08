import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

import pkg from './package.json'

const styledComponentsTransformer = createStyledComponentsTransformer();

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    }
  ],
  plugins: [
    sass({ insert: true }),
    typescript({
      objectHashIgnoreUnknownHack: true,
      transformers: [
        () => ({
          before: [styledComponentsTransformer],
        }),
      ],
    })
  ],
  external: ['react', 'react-dom', 'react-pdf']
}
