import Immutable from "immutable";
import { setValue, setStateField } from "../actions/view";
import viewReducer from "./view";

describe("View state reducer", () => {
	it("behaves as a reducer should", () =>
		expect(viewReducer, "to be a reducer with initial state", {}));

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
		return expect(newState, "not to be", oldState).and(
			"to have value at",
			"test",
			Immutable.fromJS({ stuff: "new value", things: "old value" }),
		);
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
});
