import Immutable from "immutable";
import {
	setValue,
	setStateField,
	removeEditNode,
	setEditModelField,
	setEditModelFieldError,
	setEditModelErrors,
	removeEditModel,
} from "../actions/view";
import viewReducer from "./view";
import { applicationScopeHasChanged } from "../actions/scopes";

describe("View state reducer", () => {
	it("behaves as a reducer should", () => expect(viewReducer, "to be a reducer with initial state", {}));

	it("sets a value, overwriting all fields", () => {
		const oldState = Immutable.fromJS({
			test: { things: "old value" },
			other: "don't touch",
		});
		const action = setValue("test", { stuff: "new value" });
		const newState = viewReducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to have value at",
			"test",
			Immutable.fromJS({ stuff: "new value" }),
		);
	});

	it("sets a single field", () => {
		const oldState = Immutable.fromJS({
			test: { things: "old value" },
			other: "don't touch",
		});
		const action = setStateField("test", "stuff", "new value");
		const newState = viewReducer(oldState, action);
		return expect(newState, "not to be", oldState)
			.and("to have value at", "test", Immutable.fromJS({ stuff: "new value", things: "old value" }))
			.and("to have value at", "other", "don't touch");
	});

	it("creates missing states", () => {
		const oldState = Immutable.fromJS({
			other: "don't touch",
		});
		const action = setStateField("test", "stuff", "new value");
		const newState = viewReducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to have value at",
			"test",
			Immutable.fromJS({ stuff: "new value" }),
		);
	});

	it("Sets edit field inside model correctly", () => {
		const keys = ["key1", "key2", "key3"];
		const oldValue = "oldVAlue";
		const newValue = "newValue";
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "section11";

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const model = {
			key1: {
				key2: {
					key3: {
						value: newValue,
						wasModified: true,
					},
				},
			},
		};

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model,
					},
				},
			},
		};

		const action = setEditModelField(keys, newValue, oldValue, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Removes edit node correctly", () => {
		const entityId = "entityId";
		const moduleName = "module1";

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const expected = {
			[moduleName]: {},
		};

		const action = removeEditNode(entityId, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Removes edit model correctly when model has more than one property", () => {
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "sectionName2";
		const keys = ["id", "prop1"];

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model: {
							id: {
								prop1: {},
								prop2: {},
							},
							id2: {
								prop1: {},
							},
						},
					},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model: {
							id: {
								prop2: {},
							},
							id2: {
								prop1: {},
							},
						},
					},
				},
			},
		};

		const action = removeEditModel(keys, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Removes edit model correctly when model has one property", () => {
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "sectionName2";
		const keys = ["id2", "prop1"];

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model: {
							id: {
								prop1: {},
								prop2: {},
							},
							id2: {
								prop1: {},
							},
						},
					},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model: {
							id: {
								prop1: {},
								prop2: {},
							},
							id2: {},
						},
					},
				},
			},
		};

		const action = removeEditModel(keys, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Sets field error inside model correctly", () => {
		const keys = ["key1", "key2", "key3"];
		const error = "error";
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "section11";

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const model = {
			key1: {
				key2: {
					key3: {
						error: error,
					},
				},
			},
		};

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model,
					},
				},
			},
		};

		const action = setEditModelFieldError(keys, error, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Sets all errors inside model correctly", () => {
		const errors = [
			{ keys: ["key1", "key12", "key13"], error: "error1" },
			{ keys: ["key2", "key21", "key23"], error: "error2" },
		];
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "section11";

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const model = {
			key1: {
				key12: {
					key13: {
						error: "error1",
					},
				},
			},
			key2: {
				key21: {
					key23: {
						error: "error2",
					},
				},
			},
		};

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {
						model,
					},
				},
			},
		};

		const action = setEditModelErrors(errors, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "not to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Do not set error if keys is absent", () => {
		const errors = [{ error: "error1" }];
		const entityId = "entityId";
		const moduleName = "module1";
		const sectionName = "section11";

		const modules = Immutable.fromJS({
			[moduleName]: {
				[entityId]: {
					[sectionName]: {},
				},
			},
		});

		const oldState = Immutable.Map({
			edit: modules,
		});

		const expected = {
			[moduleName]: {
				[entityId]: {
					[sectionName]: {},
				},
			},
		};

		const action = setEditModelErrors(errors, entityId, sectionName, moduleName);
		const newState = viewReducer(oldState, action);

		return expect(newState, "to be", oldState).and("to equal", Immutable.fromJS({ edit: expected }));
	});

	it("Reset the edit state when the application scope changes", () => {
		const oldState = Immutable.fromJS({
			edit: {
				id: 123,
			},
			anotherKey: {
				id: "ThisValueShouldRemain",
			},
		});
		const action = applicationScopeHasChanged("oldScope", "newScope");
		const newState = viewReducer(oldState, action);
		return expect(newState, "not to be", oldState).and(
			"to exhaustively satisfy",
			Immutable.fromJS({
				anotherKey: {
					id: "ThisValueShouldRemain",
				},
			}),
		);
	});
});
