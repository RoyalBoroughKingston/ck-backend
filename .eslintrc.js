module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-prototype-builtins': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-mutating-props': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
