module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
      rules: {
        'react/prop-types': 'off', // Will be checked by TypeScript itself (https://github.com/yannickcr/eslint-plugin-react/issues/2353)
        'no-case-declarations': 'off',
        'no-prototype-builtins': 'off',
        'no-named-as-default': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
      },
    },
    {
      files: ['**/jest.*.ts', '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.tsx'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['**/*.stories.tsx'],
      settings: {
        'import/core-modules': ['@storybook/react'],
        'import/internal-regex': '^@spglobal/',
      },
    },
    {
      files: ['**/.eslintrc.js', '**/scripts/*.js', '**/webpack.config.js'],
      env: {
        node: true,
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect',
    },
  },
};
