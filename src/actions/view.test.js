import { setValue, setStateField, VIEW_SET, VIEW_SET_FIELD } from "./view";

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
