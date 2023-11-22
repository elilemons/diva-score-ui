/* eslint-disable no-undef */
/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.base.json')

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
      // Needs to match ts.config.base.json paths
      '@root': path.resolve(__dirname, 'src/'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@queries': path.resolve(__dirname, 'src/queries'),
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      roots: ['<rootDir>'],
      testEnvironment: 'node',
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      modulePaths: ['<rootDir>'], // <-- This will be set to 'baseUrl' value
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>/${compilerOptions.baseUrl}`,
      }),
    },
  },
}
