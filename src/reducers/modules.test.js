import Immutable from "immutable";
import {
	initializeFirstModuleScope,
	setModuleAsVisible,
	setModulesStructure,
	setRoutingPerformed,
} from "../actions/modules";
import modulesReducer from "./modules";
import { applicationScopeHasChanged } from "../actions/scopes";

describe("View state reducer", () => {
	const initialState = {
		tree: {},
		visibleModules: [],
		lastScopeAndModuleSelection: {
			scope: null,
			moduleName: null,
			routingPerformed: true,
		},
	};

	it("behaves as a reducer should", () => expect(modulesReducer, "to be a reducer with initial state", initialState));

	it("Sets module structure correctly", () => {
		const oldState = Immutable.Map({});

		const modules = {
			module1: {
				pages: {
					":id1": {
						segments: {
							section11: {},
							section12: {},
						},
					},
				},
			},
			module2: {
				pages: {
					":id2": {
						segments: {
							section21: {},
							section22: {},
							section23: {},
						},
					},
				},
			},
		};

		const expected = {
			module1: {
				pages: {
					":id1": {
						infoBar: {},
						section11: {},
						section12: {},
					},
				},
			},
			module2: {
				pages: {
					":id2": {
						infoBar: {},
						section21: {},
						section22: {},
						section23: {},
					},
				},
			},
		};

		const action = setModulesStructure(modules);
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ tree: expected }));
	});

	it("Sets module structure correctly with no pages", () => {
		const oldState = Immutable.Map({});

		const modules = {
			module1: {},
			module2: {},
		};

		const action = setModulesStructure(modules);
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ tree: modules }));
	});

	it("Sets module structure correctly with no segments", () => {
		const oldState = Immutable.Map({});

		const modules = {
			module1: {
				pages: {
					":id1": {},
				},
			},
			module2: {
				pages: {
					":id2": {},
				},
			},
		};

		const action = setModulesStructure(modules);
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ tree: modules }));
	});

	it("Initialize first scope", () => {
		const oldState = Immutable.fromJS(initialState);

		const expected = {
			...initialState,
			lastScopeAndModuleSelection: {
				...initialState.lastScopeAndModuleSelection,
				scope: "firstScope",
			},
		};

		const action = initializeFirstModuleScope("firstScope");
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS(expected));
	});

	it("Add a visible module into the array", () => {
		const oldState = Immutable.fromJS({
			...initialState,
			visibleModules: ["moduleReality"],
		});

		const expected = {
			...initialState,
			visibleModules: ["moduleReality", "moduleMatrix"],
		};

		const action = setModuleAsVisible("moduleMatrix");
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS(expected));
	});

	it("set a new scope and module for eventual redirection", () => {
		const oldState = Immutable.fromJS({
			...initialState,
			lastScopeAndModuleSelection: {
				scope: "newScope",
				moduleName: null,
				routingPerformed: true,
			},
		});

		const expected = {
			...initialState,
			lastScopeAndModuleSelection: {
				scope: "newScope",
				moduleName: "moduleMatrix",
				routingPerformed: false,
			},
		};

		const action = applicationScopeHasChanged("prevScope", "newScope", "moduleMatrix");
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS(expected));
	});

	it("set a new scope and module for eventual redirection and reinitialize visible modules", () => {
		const oldState = Immutable.fromJS({
			...initialState,
			visibleModules: ["moduleReality"],
		});

		const expected = {
			...initialState,
			lastScopeAndModuleSelection: {
				scope: "newScope",
				moduleName: "moduleMatrix",
				routingPerformed: false,
			},
		};

		const action = applicationScopeHasChanged("prevScope", "newScope", "moduleMatrix");
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS(expected));
	});

	it("set routing was perform on scope and module", () => {
		const oldState = Immutable.fromJS({
			...initialState,
			lastScopeAndModuleSelection: {
				scope: "aScope",
				moduleName: "aModule",
				routingPerformed: false,
			},
		});
		const expected = {
			...initialState,
			lastScopeAndModuleSelection: {
				scope: "aScope",
				moduleName: "aModule",
				routingPerformed: true,
			},
		};

		const action = setRoutingPerformed();
		const newState = modulesReducer(oldState, action);
		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS(expected));
	});
});
