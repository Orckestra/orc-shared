import Immutable from "immutable";
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
	removeEditModelField,
	VIEW_REMOVE_EDIT_MODEL_FIELD,
	setFullEntityEditModel,
	VIEW_SET_FULL_ENTITY_EDIT_MODEL,
	removeEditAllModelFields,
	VIEW_REMOVE_EDIT_ALL_MODEL_FIELDS,
	setEditModelErrors,
	VIEW_SET_EDIT_MODEL_ERRORS,
	setEditModelFieldError,
	VIEW_SET_EDIT_MODEL_FIELD_ERRORS,
	removeEditModelFieldError,
	VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS,
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

describe("setFullEntityEditModel", () => {
	it("creates an action object", () => {
		const fullModel = Immutable.fromJS({
			a: 1,
			b: "2222",
		});
		expect(setFullEntityEditModel, "when called with", [fullModel, "moduleName"], "to equal", {
			type: VIEW_SET_FULL_ENTITY_EDIT_MODEL,
			payload: {
				entityFullModel: fullModel,
				moduleName: "moduleName",
			},
		});
	});
});

describe("removeEditAllModelFields", () => {
	it("creates an action object", () => {
		expect(
			removeEditAllModelFields,
			"when called with",
			["keys", "entityId", "sectionName", "moduleName"],
			"to equal",
			{
				type: VIEW_REMOVE_EDIT_ALL_MODEL_FIELDS,
				payload: {
					keys: "keys",
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

describe("removeEditModelField", () => {
	it("creates an action object", () => {
		expect(
			removeEditModelField,
			"when called with",
			["keys", "storeValue", "entityId", "sectionName", "moduleName"],
			"to equal",
			{
				type: VIEW_REMOVE_EDIT_MODEL_FIELD,
				payload: {
					keys: "keys",
					storeValue: "storeValue",
					entityId: "entityId",
					sectionName: "sectionName",
					moduleName: "moduleName",
				},
			},
		);
	});
});

describe("setEditModelErrors", () => {
	it("creates an action object", () => {
		expect(setEditModelErrors, "when called with", ["errors", "entityId", "sectionName", "moduleName"], "to equal", {
			type: VIEW_SET_EDIT_MODEL_ERRORS,
			payload: {
				errors: "errors",
				entityId: "entityId",
				sectionName: "sectionName",
				moduleName: "moduleName",
			},
		});
	});
});

describe("setEditModelFieldError", () => {
	it("creates an action object", () => {
		expect(
			setEditModelFieldError,
			"when called with",
			["keys", "error", "entityId", "sectionName", "moduleName"],
			"to equal",
			{
				type: VIEW_SET_EDIT_MODEL_FIELD_ERRORS,
				payload: {
					keys: "keys",
					error: "error",
					entityId: "entityId",
					sectionName: "sectionName",
					moduleName: "moduleName",
				},
			},
		);
	});
});

describe("removeEditModelFieldError", () => {
	it("creates an action object", () => {
		expect(
			removeEditModelFieldError,
			"when called with",
			["keys", "entityId", "sectionName", "moduleName"],
			"to equal",
			{
				type: VIEW_REMOVE_EDIT_MODEL_FIELD_ERRORS,
				payload: {
					keys: "keys",
					entityId: "entityId",
					sectionName: "sectionName",
					moduleName: "moduleName",
				},
			},
		);
	});
});
