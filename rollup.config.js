import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';

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
      transformers: [
        () => ({
          before: [styledComponentsTransformer],
        }),
      ],
    }),
	copy({
      targets: [
        { src: 'node_modules/pdfjs-dist/build/pdf.worker.js', dest: 'dist/public' },
      ]
    }),
	commonjs({
      namedExports: {
        'node_modules/pdfjs-dist/build/pdf.worker.entry': ['pdfjsWorker'],
      },
    }),
  ],
  external: ['react', 'react-dom', 'react-pdf', 'react-use', 'styled-components', 'lodash', 'use-intersection',
    'react-pdf/dist/esm/Page/AnnotationLayer.css', 'pdfjs-dist/build/pdf.worker.entry']
}
