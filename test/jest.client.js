module.exports = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-axe/extend-expect',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
}