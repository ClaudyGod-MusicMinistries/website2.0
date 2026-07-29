import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    linterOptions: { reportUnusedDisableDirectives: false },
    rules: {
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      // These React Compiler rules require broader architectural migrations.
      // The compiler is not enabled; retain established hooks behaviour while
      // keeping correctness, accessibility, Next.js, and TypeScript rules strict.
      'react-hooks/incompatible-library': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
    },
  },
  {
    files: ['scripts/**'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['**/*.tsx'],
    ignores: ['components/ui/**', 'data/**'],
    rules: {
      'no-restricted-syntax': [
        'warn',
        {
          selector: 'Literal[value=/-\\[#[0-9a-fA-F]{3,8}\\]/]',
          message:
            'Use a color token from tailwind.config.ts instead of a one-off arbitrary hex value.',
        },
        {
          selector: 'Literal[value=/shadow-\\[/]',
          message: 'Use a shared shadow token from tailwind.config.ts.',
        },
      ],
    },
  },
  globalIgnores(['.next/**', '.next-quality/**', 'node_modules/**', 'public/**']),
]);
