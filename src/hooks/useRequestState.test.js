import Immutable from "immutable";
import React from "react";
import useRequestState from "./useRequestState";
import { extractMessages, TestWrapper } from "../utils/testUtils";
import { requestStateOperations } from "../constants";
import sharedMessages from "../sharedMessages";
import sinon from "sinon";
import { mount } from "enzyme";
import { resetRequestState } from "../actions/requestState";

const messages = extractMessages(sharedMessages);

describe("useRequestState", () => {
	let buildRequestState;

	const TestComp = props => {
		[buildRequestState] = useRequestState(props);
		return <div>some content</div>;
	};

	let state, store, successSpy, errorSpy, dispatchSpy;
	beforeEach(() => {
		state = Immutable.fromJS({
			requestStates: {
				deletes: {},
				updates: {},
			},
		});

		successSpy = sinon.spy().named("success");
		errorSpy = sinon.spy().named("error");
		dispatchSpy = sinon.spy().named("dispatch");

		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: dispatchSpy,
		};
	});

	afterEach(() => {
		successSpy.resetHistory();
		errorSpy.resetHistory();
		dispatchSpy.resetHistory();
	});

	it("buildRequestState builds the expected object", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successAction={successSpy}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		mount(component);

		const obj = buildRequestState();
		expect(obj, "to equal", {
			keys: ["key1", "key2"],
			operation: requestStateOperations.delete,
		});
	});

	it("does not dispatch anything for an empty state", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successAction={successSpy}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		mount(component);

		expect(dispatchSpy, "was not called");
	});

	it("dispatches the success actions", () => {
		state = state.setIn(
			["requestStates", "deletes", "key1", "key2", "state"],
			Immutable.fromJS({
				inProgress: false,
				value: true,
				error: false,
			}),
		);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successAction={successSpy}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		mount(component);

		const resetAction = resetRequestState(["key1", "key2"], requestStateOperations.delete);
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(successSpy, "was called");
		expect(errorSpy, "was not called");
	});

	it("success callback is not called when undefined", () => {
		state = state.setIn(
			["requestStates", "deletes", "key1", "key2", "state"],
			Immutable.fromJS({
				inProgress: false,
				value: true,
				error: false,
			}),
		);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp keys={["key1", "key2"]} operation={requestStateOperations.delete} errorAction={errorSpy} />
			</TestWrapper>
		);

		mount(component);

		expect(successSpy, "was not called");
	});

	it("dispatches the error actions", () => {
		state = state.setIn(
			["requestStates", "deletes", "key1", "key2", "state"],
			Immutable.fromJS({
				inProgress: false,
				value: false,
				error: true,
			}),
		);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successAction={successSpy}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		mount(component);

		const resetAction = resetRequestState(["key1", "key2"], requestStateOperations.delete);
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(successSpy, "was not called");
		expect(errorSpy, "was called");
	});

	it("error action is not called when undefined", () => {
		state = state.setIn(
			["requestStates", "deletes", "key1", "key2", "state"],
			Immutable.fromJS({
				inProgress: false,
				value: false,
				error: true,
			}),
		);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp keys={["key1", "key2"]} operation={requestStateOperations.delete} successAction={successSpy} />
			</TestWrapper>
		);

		mount(component);

		expect(errorSpy, "was not called");
	});
});
