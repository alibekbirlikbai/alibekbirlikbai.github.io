module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: 'react-app',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn', // Change to 'warn' or 'off'
      'react-hooks/exhaustive-deps': 'warn', // Change to 'warn' or 'off'
      // Add other rules as needed
    },
  };
  