import { removeTab, REMOVE_TAB } from "./navigation";

describe("removeTab", () => {
	it("creates a remove tab action", () =>
		expect(
			removeTab,
			"when called with",
			["module", "/path/to/tab"],
			"to equal",
			{
				type: REMOVE_TAB,
				payload: {
					module: "module",
					path: "/path/to/tab",
				},
			},
		));
});
