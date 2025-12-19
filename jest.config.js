const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!components/**/*.d.ts",
    "!lib/**/*.d.ts",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/components/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/components/**/*.{test,spec}.{js,jsx,ts,tsx}",
    "<rootDir>/lib/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/lib/**/*.{test,spec}.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
