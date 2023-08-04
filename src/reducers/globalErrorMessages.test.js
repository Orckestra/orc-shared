import Immutable from "immutable";
import reducer from "./globalErrorMessages";
import { popGlobalErrorMessage, pushGlobalErrorMessage } from "../actions/globalErrorMessages";

describe("Global error messages reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			dialog: {
				errorMessages: [],
			},
		}));

	it("save new message to end of the list", () => {
		const oldState = Immutable.fromJS({
			dialog: {
				errorMessages: [{ msg: "123" }],
			},
		});
		const action = pushGlobalErrorMessage({ msg: "456" });
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				dialog: {
					errorMessages: [{ msg: "123" }, { msg: "456" }],
				},
			}),
		);
	});

	it("remove oldest message", () => {
		const oldState = Immutable.fromJS({
			dialog: {
				errorMessages: [{ msg: "123" }, { msg: "456" }],
			},
		});
		const action = popGlobalErrorMessage();
		const newState = reducer(oldState, action);
		expect(newState, "not to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				dialog: {
					errorMessages: [{ msg: "456" }],
				},
			}),
		);
	});

	it("remove oldest message on an empty list", () => {
		const oldState = Immutable.fromJS({
			dialog: {
				errorMessages: [],
			},
		});
		const action = popGlobalErrorMessage();
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState).and(
			"to equal",
			Immutable.fromJS({
				dialog: {
					errorMessages: [],
				},
			}),
		);
	});
});
