import sinon from "sinon";
import { loadConfig, resetConfig, buildUrl } from "./loadConfig";

describe("loadConfig", () => {
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

	it("loads the /config.json file and resets dependent functions from placeholders", () => {
		response = {
			serviceApiUrl: "https://example.com/api",
		};
		return expect(loadConfig, "when called").then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(console.warn, "was not called");
		});
	});

	it("gets defaults if fetch fails, warns of this", () => {
		fail = true;
		return expect(loadConfig, "when called").then(() => {
			expect(placeholderBuildUrl, "not to be", buildUrl);
			expect(
				console.warn,
				"was called with",
				"Failed to load config.json, falling back to dev defaults",
			);
		});
	});

	describe("buildUrl", () => {
		it("throws an error if called before loadConfig()", () =>
			expect(
				buildUrl,
				"to throw",
				"Config not yet loaded. " +
					"Please call util.js#loadConfig() and await resolution of the returned Promise.",
			));

		describe("with config loaded", () => {
			beforeEach(() => {
				response = {
					serviceApiUrl: "https://example.com/api",
				};
				return loadConfig();
			});

			it("constructs an URL from path segments", () =>
				expect(
					buildUrl,
					"called with",
					[["foo", "bar"]],
					"to equal",
					"https://example.com/api/foo/bar",
				));

			it("constructs an URL with parameters", () =>
				expect(
					buildUrl,
					"called with",
					[undefined, { lavish: true, people: 15 }],
					"to equal",
					"https://example.com/api/?lavish=true&people=15",
				));
		});
	});
});
