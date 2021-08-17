import Immutable from "immutable";
import reducer from "./requestStates";
import { requestStateOperationMap, requestStateOperations } from "../constants";
import { RESET_REQUEST_STATE } from "../actions/requestState";

describe("Request reducer", () => {
	it("behaves as a reducer should", () =>
		expect(reducer, "to be a reducer with initial state", {
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		}));

	it("should do nothing for an unknown action with requestState", () => {
		const oldState = Immutable.fromJS({
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		});
		const action = { type: "SOME_UNKNOWN_ACTION", meta: { requestState: {} } };
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState);
	});

	it("state should not be modified if the action does not have the correct state", () =>
		expect(reducer, "to be a reducer with initial state", {
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		}));

	it("state should not be modified if the action does not have the correct state", () => {
		const oldState = Immutable.fromJS({
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		});
		const action = { type: "TEST_THIS_REQUEST", meta: { requestState: null } };
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState);
	});

	it.each([
		[requestStateOperations.delete, "REQUEST"],
		[requestStateOperations.delete, "SUCCESS"],
		[requestStateOperations.delete, "FAILURE"],
		[requestStateOperations.update, "REQUEST"],
		[requestStateOperations.update, "SUCCESS"],
		[requestStateOperations.update, "FAILURE"],
	])("%s %s should not modify the state if the operation is not supported", (operation, requestSuffix) => {
		const oldState = Immutable.fromJS({
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		});
		const action = {
			type: "TEST_THIS_" + requestSuffix,
			meta: {
				requestState: {
					keys: ["key1", "key2"],
					operation: "unsupported",
				},
			},
		};
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState);
	});

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"%s operation REQUEST should initialize the state for the specified keys",
		operation => {
			const oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: "TEST_THIS_REQUEST",
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: true,
								value: false,
								error: false,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"%s operation SUCCESS should initialize the state for the specified keys",
		operation => {
			const oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: "TEST_THIS_SUCCESS",
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: false,
								value: true,
								error: false,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"%s operation FAILURE should initialize the state for the specified keys",
		operation => {
			const oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: "TEST_THIS_FAILURE",
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: false,
								value: false,
								error: true,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"%s operation should accept a string as key",
		operation => {
			const oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: "TEST_THIS_REQUEST",
				meta: {
					requestState: {
						keys: "key1",
						operation: operation,
					},
				},
			};

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						state: {
							inProgress: true,
							value: false,
							error: false,
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);
});

describe("RESET_REQUEST_STATE", () => {
	it("state should not be modified if the operation is not supported", () => {
		const oldState = Immutable.fromJS({
			deletes: Immutable.Map(),
			updates: Immutable.Map(),
		});
		const action = {
			type: RESET_REQUEST_STATE,
			meta: {
				requestState: {
					keys: ["key1", "key2"],
					operation: "unsupported",
				},
			},
		};
		const newState = reducer(oldState, action);
		expect(newState, "to be", oldState);
	});

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"state is initialized when empty for %s operation",
		operation => {
			const oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: RESET_REQUEST_STATE,
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: false,
								value: false,
								error: false,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"state is initialized when not empty for %s operation",
		operation => {
			let oldState = Immutable.fromJS({
				deletes: Immutable.Map(),
				updates: Immutable.Map(),
			});
			const action = {
				type: RESET_REQUEST_STATE,
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			oldState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: true,
								value: true,
								error: true,
								anotherProp: true,
							},
						},
					},
				}),
			);

			const expectedState = oldState.set(
				requestStateOperationMap[operation],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: false,
								value: false,
								error: false,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);

	it.each([[requestStateOperations.delete], [requestStateOperations.update]])(
		"other keys are not touched when state is initialized for %s operation",
		operation => {
			let oldState = Immutable.fromJS({
				deletes: Immutable.Map({
					key3: {
						key4: {
							state: {
								inProgress: false,
								value: true,
								error: false,
							},
						},
					},
				}),
				updates: Immutable.Map({
					key3: {
						key4: {
							state: {
								inProgress: false,
								value: true,
								error: false,
							},
						},
					},
				}),
			});
			const action = {
				type: RESET_REQUEST_STATE,
				meta: {
					requestState: {
						keys: ["key1", "key2"],
						operation: operation,
					},
				},
			};

			const expectedState = oldState.mergeIn(
				[requestStateOperationMap[operation]],
				Immutable.fromJS({
					key1: {
						key2: {
							state: {
								inProgress: false,
								value: false,
								error: false,
							},
						},
					},
				}),
			);

			const newState = reducer(oldState, action);
			expect(newState, "not to be", oldState).and("to equal", expectedState);
		},
	);
});
