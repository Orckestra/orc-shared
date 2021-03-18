const jestConfig = require("orc-scripts/src/config/jest.config");

jestConfig["coverageThreshold"] = {
	global: {
		branches: 100,
		functions: 100,
		lines: 100,
		statements: 100,
	},
};

module.exports = jestConfig;
