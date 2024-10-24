import sinon from "sinon";
import { spyOnConsole } from "./testUtils";
import { loadConfig, resetConfig, buildUrl, buildExternalAppUrl } from "./buildUrl";

describe("loadConfig", () => {
	spyOnConsole();
	let oldFetch, fail, response, placeholderBuildUrl;
	beforeEach(() => {
		oldFetch = window.fetch;
		response = "";
		fail = false;
		window.fetch = sinon
			.spy(() => {
				if (fail) {
					return Promise.reject();
				} else {
					return Promise.resolve({ json: () => response });
				}
			})
			.named("fetch");
		placeholderBuildUrl = buildUrl;
	});
	afterEach(() => {
		window.fetch = oldFetch;
		resetConfig();
	});

	it("loads the /config.json file, sets version, sets module name and resets dependent functions from placeholders", () => {
		response = {
			serviceApiUrl: "https://example.com/api",
		};
		return expect(loadConfig, "when called with", []).then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(console.warn, "was not called");
		});
	});

	it("gets defaults if fetch fails, warns of this", () => {
		fail = true;
		return expect(loadConfig, "when called with", []).then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(console.warn, "was called with", "Failed to load config.json, falling back to dev defaults");
		});
	});

	describe("buildUrl", () => {
		it("throws an error if called before loadConfig()", () =>
			expect(
				buildUrl,
				"to throw",
				"Config not yet loaded. Please call util.js#loadConfig() and await resolution of the returned Promise.",
			));

		describe("with config loaded", () => {
			beforeEach(() => {
				response = {
					serviceApiUrl: "https://example.com/api",
				};
				return loadConfig();
			});

			it("constructs an URL from path segments", () =>
				expect(buildUrl, "called with", [["foo", "bar"]], "to equal", "https://example.com/api/foo/bar"));

			it("constructs an URL with parameters", () =>
				expect(
					buildUrl,
					"called with",
					[undefined, { lavish: true, people: 15, listThings: ["Foo", "Bar"] }],
					"to equal",
					'https://example.com/api/?lavish=true&people=15&listThings=["Foo","Bar"]',
				));
		});
	});

	describe("buildExternalAppUrl", () => {
		it("throws an error if called with an unknown app", () => {
			expect(
				() => expect(buildExternalAppUrl, "when called with", ["unknown", "fakeurl"]),
				"to throw",
				"Not implemented app 'unknown'",
			);
		});

		it("should build an valid relative url with oms", () => {
			expect(buildExternalAppUrl, "called with", ["oms", "fakeurl"], "to equal", "/oms/app/fakeurl");
		});

		it("should build an valid relative url with pim", () => {
			expect(buildExternalAppUrl, "called with", ["pim", "fakeurl"], "to equal", "/pim/app/fakeurl");
		});

		it("should not be case sensitive about the app name", () => {
			expect(buildExternalAppUrl, "called with", ["PIM", "fakeurl"], "to equal", "/pim/app/fakeurl");
		});

		it("should handle delimiter", () => {
			expect(buildExternalAppUrl, "called with", ["pim", "/fakeurl"], "to equal", "/pim/app/fakeurl");
		});
	});
});
