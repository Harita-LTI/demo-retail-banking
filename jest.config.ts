// export default {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
// };

//import type { Config } from "jest";

const config: any = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    //"^js(.*)$": "<rootDir>/app/javascript/$1",
    //"^vendor(.*)$": "<rootDir>/vendor/$1",
  },
  moduleDirectories: ["node_modules", "src"],
};

export default config;
