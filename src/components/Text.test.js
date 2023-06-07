import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Text, { Placeholder } from "./Text";
import { createMuiTheme, TestWrapper } from "../utils/testUtils";

const theme = createMuiTheme();

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
				<IntlProvider locale="en">
					<Text message="Test message" />
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			"Test message",
		));

	it("renders an empty string", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text message="" />
				</IntlProvider>
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
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text
					message={{
						id: "test.msg",
						defaultMessage: "Test message {foo}",
						values: { foo: 3 },
					}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			"Test message 3",
		));

	it("renders a translated message with a value selector", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text
					message={{
						id: "test.msg",
						defaultMessage: "Test message {foo}",
						values: state => state.dataVal,
					}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			"Test message 3",
		));

	it("renders a translated message missing its values as a placeholder", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text
						message={{
							id: "test.msg",
							defaultMessage: "Test message {foo}",
						}}
					/>
				</IntlProvider>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Placeholder />,
		));

	it("renders an error", () =>
		expect(
			<Provider store={store}>
				<IntlProvider locale="en">
					<Text message="Test message" error={{ message: "This failed" }} />
				</IntlProvider>
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
				<IntlProvider locale="en">
					<Text />
				</IntlProvider>
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
