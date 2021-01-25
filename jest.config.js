module.exports = {
  ...require('./test/jest-common'),
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
    // './src/shared/utils.js': {
    //   statements: 100,
    //   branches: 80,
    //   functions: 100,
    //   lines: 100,
    // },
  },
  collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
  projects: ['./test/jest.lint.js', './test/jest.client.js'],
}
