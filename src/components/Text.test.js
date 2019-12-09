import React from "react";
import { FormattedMessage } from "react-intl";
import Text, { messageContainsValues, Placeholder } from "./Text";

describe("Text", () => {
	it("renders a simple message", () =>
		expect(
			<Text message="Test message" />,
			"when mounted",
			"to satisfy",
			<span>Test message</span>,
		));

	it("renders an empty string", () =>
		expect(
			<Text message="" />,
			"when mounted",
			"to satisfy",
			<span>{""}</span>,
		));

	it("renders a translated message", () =>
		expect(
			<Text message={{ id: "test.msg", defaultMessage: "Test message" }} />,
			"when mounted",
			"to satisfy",
			<FormattedMessage id="test.msg" defaultMessage="Test message" />,
		));

	it("renders a translated message with values", () =>
		expect(
			<Text
				message={{
					id: "test.msg",
					defaultMessage: "Test message {foo}",
					values: { foo: 3 },
				}}
			/>,
			"when mounted",
			"to satisfy",
			<FormattedMessage
				id="test.msg"
				defaultMessage="Test message {foo}"
				values={{ foo: 3 }}
			/>,
		));

	it("renders a translated message missing its values as a placeholder", () =>
		expect(
			<Text
				message={{
					id: "test.msg",
					defaultMessage: "Test message {foo}",
				}}
			/>,
			"when mounted",
			"to satisfy",
			<Placeholder />,
		));

	it("renders an error", () =>
		expect(
			<Text message="Test message" error={{ message: "This failed" }} />,
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
			<Text />,
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
