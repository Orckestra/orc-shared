import React from "react";
import { useDispatchWithErrorHandling } from "./useDispatchWithErrorHandling";
import sinon from "sinon";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import Immutable from "immutable";
import { pushGlobalErrorMessage } from "../actions/globalErrorMessages";

const delay = () => new Promise(resolve => setTimeout(resolve, 10));

describe("useDispatchWithErrorHandling", () => {
	let store, state, dispatchSpy;

	beforeEach(() => {
		state = Immutable.fromJS({});
		dispatchSpy = sinon.stub().named("dispatch");

		store = {
			subscribe: () => {},
			dispatch: dispatchSpy,
			getState: () => state,
		};
	});

	it("Dispatches action just with specified parameters", () => {
		dispatchSpy.resolves({});

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(dispatchSpy.callCount, "to be", 1);
		expect(dispatchSpy, "to have a call satisfying", { args: [{ type: "testing" }] });
	});

	it("does not push messages because data is null", () => {
		dispatchSpy.resolves(null);

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(dispatchSpy.callCount, "to be", 1);
	});

	it("does not push messages because data is an empty object", () => {
		dispatchSpy.resolves({});

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(dispatchSpy.callCount, "to be", 1);
	});

	it("does not push messages because data is a response with error=false", () => {
		dispatchSpy.resolves({ error: false });

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		expect(dispatchSpy.callCount, "to be", 1);
	});

	it("dispatch new message with title and description because of empty msg list", () => {
		dispatchSpy.resolves({
			error: true,
			payload: {
				status: 500,
			},
		});

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		delay().then(() => {
			expect(dispatchSpy.callCount, "to be", 2);
			expect(dispatchSpy, "to have a call satisfying", {
				args: [
					pushGlobalErrorMessage({
						title: "title",
						description: "desc",
						messages: [],
					}),
				],
			});
		});
	});

	it("dispatch new message with only title because msg list is filled", () => {
		dispatchSpy.resolves({
			error: true,
			payload: {
				status: 500,
				response: {
					errors: [
						{
							message: "msg",
							lookupModule: "mod",
							lookupName: "name",
							lookupKey: "key",
						},
					],
				},
			},
		});

		const TestComp = () => {
			const dispatch = useDispatchWithErrorHandling();
			dispatch({
				action: { type: "testing" },
				errorTitle: "title",
				errorDescription: "desc",
				validationLookupModule: "order",
				validationLookupName: "ValidationsOrderReturns",
			});
			return null;
		};

		const component = (
			<Provider store={store}>
				<TestComp />
			</Provider>
		);

		mount(component);

		delay().then(() => {
			expect(dispatchSpy.callCount, "to be", 2);
			expect(dispatchSpy, "to have a call satisfying", {
				args: [
					pushGlobalErrorMessage({
						title: "title",
						description: null,
						messages: [
							{
								message: "msg",
								lookupModule: "mod",
								lookupName: "name",
								lookupKey: "key",
							},
						],
					}),
				],
			});
		});
	});
});
