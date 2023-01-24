/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@config/(.*)': '<rootDir>/src/config/$1',
		'@image/(.*)': '<rootDir>/src/image/$1',
		'@src/(.*)': '<rootDir>/src/$1',
	},
};
