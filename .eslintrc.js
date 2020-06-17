'use strict';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    // These plugins should be installed only on React project
    // 'plugin:react/recommended',
    // 'plugin:jsx-a11y/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  // This feature should be installed only on React project
  // plugins: ['react', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    // This feature should be installed only on React project
    // ecmaFeatures: {
    //   jsx: true,
    // },
  },
  // This feature should be installed only on React project
  // settings: {
  //   react: {
  //     version: "latest",
  //   },
  // },
};
