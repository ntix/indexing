import typescript from '@rollup/plugin-typescript';

//import pkg from './package.json' with { type: 'json' };

export default {
  input: `src/index.ts`,
  output: [
    {
      //file: pkg.main,
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'indexing',
      sourcemap: true,
    },
  ],
  watch: {
    include: ['src/**'],
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
};
