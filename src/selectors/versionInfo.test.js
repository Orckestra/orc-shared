import Immutable from "immutable";
import {
	getApplicationHelpUrlSelector,
	getHelpUrlDefaultSelector,
	getVersionSelector,
} from "./versionInfo";

let state;

beforeEach(() => {
	state = Immutable.fromJS({
		locale: {
			locale: "fr-FR",
			supportedLocales: ["en-US", "fr-FR"],
		},
		versionInfo: {
			version: "4.3.2.1",
			helpUrlDefault: "the_help_url_default",
			moduleHelpUrls: [
				{ moduleName: "app1", helpUrl: "app1.com" },
				{ moduleName: "app2", helpUrl: "app2.com" },
			],
		},
	});
});

describe("getVersionSelector", () => {
	it("gets the version of the current OCC platform", () =>
		expect(
			getVersionSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS("4.3.2.1"),
		));
});

describe("getHelpUrlDefaultSelector", () => {
	it("gets the default help URL for the OCC platform", () =>
		expect(
			getHelpUrlDefaultSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS("the_help_url_default"),
		));
});

describe("getApplicationHelpUrlSelector", () => {
	it("gets the default help URL for the OCC platform", () =>
		expect(
			getApplicationHelpUrlSelector,
			"called with",
			[state],
			"to equal",
			Immutable.fromJS([
				{ moduleName: "app1", helpUrl: "app1.com" },
				{ moduleName: "app2", helpUrl: "app2.com" },
			]),
		));
});
