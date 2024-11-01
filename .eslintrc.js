module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'error',
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
