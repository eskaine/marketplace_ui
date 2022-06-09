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
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': [2, {'namedComponents': 'arrow-function',}],
    'linebreak-style': [2, 'windows'],
    'no-restricted-exports': [0, { "restrictedNamedExports": ["default"] }]
  },
  overrides: [
    {
      files: ['*.jsx', '*.js'],
    },
  ],
};
