/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@/*': '<rootDir>/$1',
		'@config/(.*)': '<rootDir>/src/config/$1',
		'@test/(.*)': '<rootDir>/src/test/$1',
		'@image/(.*)': '<rootDir>/src/image/$1',
		'@middleware/(.*)': '<rootDir>/src/middleware/$1',
		'@src/(.*)': '<rootDir>/src/$1',
	},
	moduleDirectories: ['node_modules'],
};
