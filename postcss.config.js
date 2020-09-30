
module.exports = {
  plugins: {
    'postcss-import': {
      path: ['src/style']
    },
    'postcss-mixins': {
    },
    'postcss-preset-env': {
      features: {
        'custom-properties': {
          preserve: true
        },
        'color-mod-function': true
      }
    },
    'postcss-calc': {},
    'precss': {}
  }
}
