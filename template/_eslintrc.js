module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  env: {
    es6: true,
    node: true,
    mocha: true
  },

  plugins: ['vue'],

  globals: {
    expect: true,
    sinon: true,
    zanui: true,
    document: false,
    navigator: false,
    window: false,
    require: true,
    FileReader: true,
    File: true
  },

  rules: {
    'accessor-pairs': 2,
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    "array-bracket-spacing": [2, "never"],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'camelcase': 0,
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, { 'before': false, 'after': true }],
    'comma-style': [2, 'last'],
    'constructor-super': 0,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': 0
  }
}
