module.exports = {
  testEnvironment: "jsdom",
  // Transform js and jsx files with babel-jest
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Ignore test paths (must be an array, not an object)
  testPathIgnorePatterns: [
    "/e2e-tests/", 
  ],

  collectCoverageFrom: [
    // Collect coverage from all js or jsx files in src folder
    "src/**/*.{js,jsx}", 
    // Exclude test files from coverage
    "!src/**/*.test.{js,jsx}", 
    // Exclude main.jsx from coverage
    "!src/main.jsx",
    // Exclude App.jsx from coverage
    "!src/App.jsx", 
    // Exclude routes.jsx from coverage
    "!src/routes.jsx",
  ],
  testResultsProcessor: "jest-sonar-reporter",
};
