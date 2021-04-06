import {
	setValue,
	setStateField,
	VIEW_SET,
	VIEW_SET_FIELD,
	VIEW_REMOVE_EDIT_NODE,
	VIEW_SET_EDIT_MODEL_FIELD,
	removeEditNode,
	setEditModelField,
	removeEditModel,
	VIEW_REMOVE_EDIT_MODEL,
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
		expect(
			setEditModelField,
			"when called with",
			["keys", "value", "storeValue", "entityId", "sectionName", "moduleName"],
			"to equal",
			{
				type: VIEW_SET_EDIT_MODEL_FIELD,
				payload: {
					keys: "keys",
					value: "value",
					storeValue: "storeValue",
					entityId: "entityId",
					sectionName: "sectionName",
					moduleName: "moduleName",
				},
			},
		);
	});
});

describe("removeEditModel", () => {
	it("creates an action object", () => {
		expect(removeEditModel, "when called with", ["keys", "entityId", "sectionName", "moduleName"], "to equal", {
			type: VIEW_REMOVE_EDIT_MODEL,
			payload: {
				keys: "keys",
				entityId: "entityId",
				sectionName: "sectionName",
				moduleName: "moduleName",
			},
		});
	});
});
