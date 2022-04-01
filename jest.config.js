module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '/*/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['deps', 'dist', 'node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
