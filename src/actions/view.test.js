import {
	setValue,
	setStateField,
	VIEW_SET,
	VIEW_SET_FIELD,
	VIEW_INITIALIZE_EDIT_TREE,
	VIEW_CREATE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL,
	VIEW_REMOVE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL_FIELD,
	initializeEditTree,
	createEditNode,
	removeEditNode,
	setEditModel,
	setEditModelField
} from "./view";

describe("setValue", () => {
	it("creates an action object", () =>
		expect(setValue, "when called with", ["testfield", { thing: true }], "to equal", {
			type: VIEW_SET,
			payload: { name: "testfield", value: { thing: true } },
		}));
});

describe("setStateField", () => {
	it("creates an action object", () =>
		expect(setStateField, "when called with", ["testfield", "thing", false], "to equal", {
			type: VIEW_SET_FIELD,
			payload: { name: "testfield", field: "thing", value: false },
		}));
});

describe("setStateField", () => {
	it("creates an action object", () =>
		expect(setStateField, "when called with", ["testfield", "thing", false], "to equal", {
			type: VIEW_SET_FIELD,
			payload: { name: "testfield", field: "thing", value: false },
		}));
});

describe("setStateField", () => {
	it("creates an action object", () => {
		expect(initializeEditTree, "when called with", ["modules"], "to equal", {
			type: VIEW_INITIALIZE_EDIT_TREE,
			payload: "modules",
		});
	});
});

describe("createEditNode", () => {
	it("creates an action object", () => {
		expect(createEditNode, "when called with", ["entityId", "moduleName", "modules"], "to equal", {
			type: VIEW_CREATE_EDIT_NODE,
			payload: { entityId: "entityId", moduleName: "moduleName", modulesData: "modules" },
		});
	});
});

describe("setEditModel", () => {
	it("creates an action object", () => {
		expect(setEditModel, "when called with", ["model", "entityId", "sectionName", "moduleName"], "to equal", {
			type: VIEW_SET_EDIT_MODEL,
			payload: { model: "model", entityId: "entityId", sectionName: "sectionName", moduleName: "moduleName" },
		});
	});
});

describe("removeEditNode", () => {
	it("creates an action object", () => {
		expect(removeEditNode, "when called with", ["entityId", "moduleName"], "to equal", {
			type: VIEW_REMOVE_EDIT_NODE,
			payload: { entityId: "entityId", moduleName: "moduleName" },
		});
	});
});

describe("setEditModelField", () => {
	it("creates an action object", () => {
		expect(setEditModelField, "when called with", ["keys", "value", "storeValue", "entityId", "sectionName", "moduleName"], "to equal", {
			type: VIEW_SET_EDIT_MODEL_FIELD,
			payload: {
				keys: "keys",
				value: "value",
				storeValue: "storeValue",
				entityId: "entityId",
				sectionName: "sectionName",
				moduleName: "moduleName"
			},
		});
	});
});
