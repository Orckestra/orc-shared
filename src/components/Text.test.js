import React from "react";
import Text, { Placeholder } from "./Text";
import { FormattedMessage } from "react-intl";
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
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text message="Test message" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			"Test message",
		));

	it("renders an empty string", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text message="" />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			"",
		));

	it("renders a translated message", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text message={{ id: "test.msg", defaultMessage: "Test message" }} />
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text
					message={{
						id: "test.msg",
						defaultMessage: "Test message {foo}",
					}}
				/>
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<Placeholder />,
		));

	it("renders an error", () =>
		expect(
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text message="Test message" error={{ message: "This failed" }} />
			</TestWrapper>,
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
			<TestWrapper provider={{ store }} intlProvider memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Text />
			</TestWrapper>,
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
