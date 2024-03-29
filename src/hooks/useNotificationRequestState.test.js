import Immutable from "immutable";
import React from "react";
import useNotificationRequestState from "./useNotificationRequestState";
import { extractMessages, TestWrapper } from "../utils/testUtils";
import { requestStateOperations } from "../constants";
import sharedMessages from "../sharedMessages";
import sinon from "sinon";
import { mount } from "enzyme";
import { resetRequestState } from "../actions/requestState";
import Snackbar from "@material-ui/core/Snackbar";
import * as getRequestStateInfo from "../selectors/requestStates";

const messages = extractMessages(sharedMessages);

describe("useNotificationRequestState", () => {
	let buildRequestState;

	const TestComp = props => {
		[buildRequestState] = useNotificationRequestState(props);
		return <div>some content</div>;
	};

	let state, store, successSpy, errorSpy, dispatchSpy;
	beforeEach(() => {
		state = Immutable.fromJS({
			requestStates: {
				creates: {},
				deletes: {},
				fetches: {},
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
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
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
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
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
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const sb = mountedComponent.find(Snackbar);

		const resetAction = resetRequestState(["key1", "key2"], requestStateOperations.delete);
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(successSpy, "was called");
		expect(errorSpy, "was not called");
		expect(sb.prop("open"), "to equal", true);
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
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successMessageId={sharedMessages.delete}
					errorMessageId={sharedMessages.error}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const sb = mountedComponent.find(Snackbar);

		expect(successSpy, "was not called");
		expect(sb.prop("open"), "to equal", true);
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
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const sb = mountedComponent.find(Snackbar);

		const resetAction = resetRequestState(["key1", "key2"], requestStateOperations.delete);
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(successSpy, "was not called");
		expect(errorSpy, "was called");
		expect(sb.prop("open"), "to equal", true);
	});

	it("dispatches the error actions with a message", () => {
		const errorPayload = {
			response: {
				responseStatus: {
					message: "some error message",
				},
			},
		};

		const getRequestStateInfoOverride = () => ({
			inProgress: false,
			value: false,
			error: errorSpy.callCount === 0,
			errorResponse: errorSpy.callCount === 0 ? errorPayload : null,
		});

		const getRequestStateInfoStub = sinon
			.stub(getRequestStateInfo, "getRequestStateInfo")
			.returns(() => getRequestStateInfoOverride());

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} stylesProvider>
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
					errorAction={errorSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const sb = mountedComponent.find(Snackbar);

		const resetAction = resetRequestState(["key1", "key2"], requestStateOperations.delete);
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(dispatchSpy, "to have a call satisfying", { args: [resetAction] });
		expect(successSpy, "was not called");
		expect(errorSpy, "to have a call satisfying", { args: [errorPayload] });
		expect(sb.prop("open"), "to equal", true);

		getRequestStateInfoStub.restore();
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
				<TestComp
					keys={["key1", "key2"]}
					operation={requestStateOperations.delete}
					successMessageId={sharedMessages.delete}
					successAction={successSpy}
					errorMessageId={sharedMessages.error}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const sb = mountedComponent.find(Snackbar);

		expect(errorSpy, "was not called");
		expect(sb.prop("open"), "to equal", true);
	});
});
