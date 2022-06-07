module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/button-has-type': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [
      2,
      {
        'namedComponents': 'arrow-function',
      },
    ],
    'linebreak-style': ['error', 'windows'],
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
};
