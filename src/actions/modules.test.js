import {
	INITIALIZE_FIRST_MODULE_SCOPE,
	initializeFirstModuleScope,
	SET_MODULE_AS_VISIBLE,
	SET_MODULES_STRUCTURE,
	SET_ROUTING_PERFORMED,
	setModuleAsVisible,
	setModulesStructure,
	setRoutingPerformed,
} from "./modules";

describe("setModulesStructure", () => {
	it("creates an action object", () => {
		expect(setModulesStructure, "when called with", ["modules"], "to equal", {
			type: SET_MODULES_STRUCTURE,
			payload: "modules",
		});
	});
});

describe("initializeFirstModuleScope", () => {
	it("creates an action object", () => {
		expect(initializeFirstModuleScope, "when called with", ["module_1"], "to equal", {
			type: INITIALIZE_FIRST_MODULE_SCOPE,
			payload: "module_1",
		});
	});
});

describe("setModuleAsVisible", () => {
	it("creates an action object", () => {
		expect(setModuleAsVisible, "when called with", ["module_A"], "to equal", {
			type: SET_MODULE_AS_VISIBLE,
			payload: "module_A",
		});
	});
});

describe("setRoutingPerformed", () => {
	it("creates an action object", () => {
		expect(setRoutingPerformed, "when called", "to equal", {
			type: SET_ROUTING_PERFORMED,
		});
	});
});
