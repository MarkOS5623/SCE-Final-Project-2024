module.exports = {
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
      axios: "axios/dist/node/axios.cjs"
    },  
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',  
    }, 
    transformIgnorePatterns: [
      'node_modules/(?!(axios|@syncfusion))', 
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: "jsdom",  
  };
  