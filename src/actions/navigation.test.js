import { removeTab, REMOVE_TAB, setHrefConfig, SET_HREF_CONFIG } from "./navigation";

describe("removeTab", () => {
	it("creates a remove tab action", () =>
		expect(removeTab, "when called with", ["module", "/path/to/tab"], "to equal", {
			type: REMOVE_TAB,
			payload: {
				module: "module",
				path: "/path/to/tab",
			},
		}));
});

describe("setHrefConfig", () => {
	it("set href config action", () =>
		expect(setHrefConfig, "when called with", ["/:scope/", "/scope/"], "to equal", {
			type: SET_HREF_CONFIG,
			payload: {
				prependPath: "/:scope/",
				prependHref: "/scope/",
			},
		}));
});
