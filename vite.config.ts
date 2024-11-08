import { resolve } from 'path';
import swc from 'unplugin-swc';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'v8',
      exclude: [
        './src/config/**/*.ts',
        '**/index.ts',
        '**/*.module.ts',
        '**/*.entity.ts',
        '**/*.dto.ts',
        '**/*.enum.ts',
        '**/*.exception.ts',
        ...coverageConfigDefaults.exclude
      ]
    }
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      '@config': resolve(__dirname, './src/config'),
      '@modules': resolve(__dirname, './src/modules'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
});
