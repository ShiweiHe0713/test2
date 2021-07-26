module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        useTabs: false
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'semi-spacing': ['error', { before: false, after: true }],
    'comma-dangle': ['error', 'never'],
    'no-multi-spaces': 'error',
    'block-spacing': 'error',
    quotes: ['error', 'single'],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-control-regex': ['warn'],
    eqeqeq: ['error', 'always']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
