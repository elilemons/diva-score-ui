/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path')

module.exports = {
  configure: {
    ignoreWarnings: [
      function ignoreSourcemapsloaderWarnings(warning) {
        return (
          warning.module &&
          warning.module.resource.includes('node_modules') &&
          warning.details &&
          warning.details.includes('source-map-loader')
        )
      },
    ],
  },
  webpack: {
    alias: {
      '@root': path.resolve(__dirname, 'src/'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@queries': path.resolve(__dirname, 'src/queries'),
    },
  },
}
