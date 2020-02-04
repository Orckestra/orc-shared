import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Text, { messageContainsValues, Placeholder } from "./Text";

describe("Text", () => {
	let state, store;
	beforeEach(() => {
		state = { dataVal: { foo: 3 } };
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a simple message", () =>
		expect(
			<Provider store={store}>
				<Text message="Test message" />
			</Provider>,
			"when mounted",
			"to satisfy",
			"Test message",
		));

	it("renders an empty string", () =>
		expect(
			<Provider store={store}>
				<Text message="" />
			</Provider>,
			"when mounted",
			"to satisfy",
			"",
		));

	it("renders a translated message", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text message={{ id: "test.msg", defaultMessage: "Test message" }} />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			"Test message",
		));

	it("renders a translated message with values", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text
						message={{
							id: "test.msg",
							defaultMessage: "Test message {foo}",
							values: { foo: 3 },
						}}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			"Test message 3",
		));

	it("renders a translated message with a value selector", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text
						message={{
							id: "test.msg",
							defaultMessage: "Test message {foo}",
							values: state => state.dataVal,
						}}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			"Test message 3",
		));

	it("renders a translated message missing its values as a placeholder", () =>
		expect(
			<Provider store={store}>
				<Text
					message={{
						id: "test.msg",
						defaultMessage: "Test message {foo}",
					}}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Placeholder />,
		));

	it("renders an error", () =>
		expect(
			<Provider store={store}>
				<Text message="Test message" error={{ message: "This failed" }} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				{"Errored: "}
				{"This failed"}
			</span>,
		));

	it("renders an error if no message given", () =>
		expect(
			<Provider store={store}>
				<Text />
			</Provider>,
			"when mounted",
			"to satisfy",
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				{"Errored: "}
				{"No message provided"}
			</span>,
		));
});

describe("messageContainsValues", () => {
	it("validates messages without needed values", () =>
		expect(
			messageContainsValues,
			"called with",
			[{ defaultMessage: "Test" }],
			"to be true",
		));

	it("invalidates messages missing values", () =>
		expect(
			messageContainsValues,
			"called with",
			[{ defaultMessage: "Test {foo}" }],
			"to be false",
		));

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
