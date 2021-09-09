import Immutable from "immutable";
import { getRequestStateInfo } from "./requestStates";
import { requestStateOperations } from "../constants";

describe("getRequestStateInfo", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			requestStates: {
				deletes: {
					key1: {
						key2: {
							state: {
								inProgress: true,
								value: false,
								error: false,
							},
						},
					},
				},
				updates: {
					key3: {
						state: {
							inProgress: false,
							value: true,
							error: false,
						},
					},
				},
			},
		});
	});

	it("gets the info of a requestState from state", () => {
		const expected = Immutable.fromJS({
			inProgress: true,
			value: false,
			error: false,
		});

		expect(
			getRequestStateInfo,
			"called with",
			[requestStateOperations.delete, ["key1", "key2"]],
			"called with",
			[state],
			"to equal",
			expected,
		);
	});

	it("gets empty info of an unknown requestState from state", () => {
		const expected = {};

		expect(
			getRequestStateInfo,
			"called with",
			[requestStateOperations.delete, ["key1"]],
			"called with",
			[state],
			"to equal",
			expected,
		);
	});

	it("gets the info of a requestState from state using a string instead of array for key", () => {
		const expected = Immutable.fromJS({
			inProgress: false,
			value: true,
			error: false,
		});

		expect(
			getRequestStateInfo,
			"called with",
			[requestStateOperations.update, ["key3"]],
			"called with",
			[state],
			"to equal",
			expected,
		);
	});
});
