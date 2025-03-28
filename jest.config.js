module.exports = {
  // The root of your source code
  roots: ['<rootDir>/components', '<rootDir>/pages'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'components', 'pages'],
  // A list of paths to modules that run some code to configure or set up the testing environment before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',

};