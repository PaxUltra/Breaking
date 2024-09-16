const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

const config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/app/$1',
        '^@/components/(.*)$': '<rootDir>/components/$1'
    }
};

module.exports = createJestConfig(config);