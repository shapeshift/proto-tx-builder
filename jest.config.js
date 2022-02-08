module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: '/*/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['node_modules', 'dist', 'osmosis-frontend'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
