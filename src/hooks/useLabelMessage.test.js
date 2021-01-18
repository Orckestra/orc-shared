import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Immutable from "immutable";
import sinon from "sinon";
import { messageContainsValues } from "./useLabelMessage";
import useLabelMessage from "./useLabelMessage";

const TestComp = ({ message, buildMessage }) => {
	const [msgResult, missingValues = false] = useLabelMessage(message, buildMessage);

	return <div missing-values={missingValues ? 1 : 0}>{msgResult}</div>;
};

describe("useLabelMessage", () => {
	let store, state;
	beforeEach(() => {
		state = Immutable.fromJS({});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	it("handles message correctly", () => {
		const message = { id: "test.msg", defaultMessage: "Test message" };

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<TestComp message={message} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>Test message</div>,
		);
	});

	it("handles message with values correctly", () => {
		const message = {
			id: "test.msg",
			defaultMessage: "Test message {aValue}",
			values: { aValue: "testValue" },
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<TestComp message={message} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>Test message testValue</div>,
		);
	});

	it("handles message with wrong values", () => {
		const message = {
			id: "test.msg",
			defaultMessage: "Test message {aValue}",
			values: { aWrongValue: "testValue" },
		};

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<TestComp message={message} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div missing-values={1}></div>,
		);
	});

	it("handles message with missing values", () => {
		const message = { id: "test.msg", defaultMessage: "Test message {aValue}" };

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<TestComp message={message} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div missing-values={1}></div>,
		);
	});

	it("handles message correctly with a custom builder", () => {
		const message = { id: "test.msg", defaultMessage: "Test message" };

		return expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<TestComp message={message} buildMessage={a => a.defaultMessage.concat("_customBuilder")} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<div>Test message_customBuilder</div>,
		);
	});
});

describe("messageContainsValues", () => {
	it("validates messages without needed values", () =>
		expect(messageContainsValues, "called with", [{ defaultMessage: "Test" }], "to be true"));

	it("invalidates messages missing values", () =>
		expect(messageContainsValues, "called with", [{ defaultMessage: "Test {foo}" }], "to be false"));

	it("invalidates messages missing some needed values", () =>
		expect(
			messageContainsValues,
			"called with",
			[{ defaultMessage: "Test {foo} {bar}", values: { foo: 1 } }],
			"to be false",
		));

	it("invalidates messages with needed values set to null", () =>
		expect(
			messageContainsValues,
			"called with",
			[{ defaultMessage: "Test {foo} {bar}", values: { foo: 1, bar: null } }],
			"to be false",
		));

	it("validates messages containing all needed values", () =>
		expect(
			messageContainsValues,
			"called with",
			[{ defaultMessage: "Test {foo} {bar}", values: { foo: 1, bar: "aaa" } }],
			"to be true",
		));
});
