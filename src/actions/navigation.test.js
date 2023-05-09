import {
	removeTab,
	REMOVE_TAB,
	setHrefConfig,
	SET_HREF_CONFIG,
	setClosingTabHandlerActions,
	SET_CLOSING_TAB_HANDLER_ACTIONS,
	removeModuleTabs,
	REMOVE_MODULE_TABS,
} from "./navigation";

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

describe("removeModuleTabs", () => {
	it("creates a remove module tabs action", () =>
		expect(removeModuleTabs, "when called with", ["module"], "to equal", {
			type: REMOVE_MODULE_TABS,
			payload: {
				module: "module",
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

describe("setClosingTabHandlerActions", () => {
	it("set closing tab handler actions", () => {
		const actions = [
			{ id: "id1", action: () => "action1" },
			{ id: "id2", action: () => "action2" },
		];

		expect(setClosingTabHandlerActions, "when called with", ["a_module_x", actions], "to equal", {
			type: SET_CLOSING_TAB_HANDLER_ACTIONS,
			payload: {
				module: "a_module_x",
				actions: actions,
			},
		});
	});
});
