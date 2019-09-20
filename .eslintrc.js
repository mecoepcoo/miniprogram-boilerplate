module.exports = {
  env: {
    // browser: true,
    es6: true,
    // node: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2015
  },
  rules: {
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      }
    ],
    'no-console': 'off',
    'no-global-assign': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  }
};