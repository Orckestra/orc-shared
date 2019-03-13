import React from "react";
import { FormattedMessage } from "react-intl";
import Text from "./Text";

describe("Text", () => {
	it("renders a simple message", () =>
		expect(
			<Text message="Test message" />,
			"renders elements",
			"to render as",
			<span>Test message</span>,
		));

	it("renders an empty string", () =>
		expect(
			<Text message="" />,
			"renders elements",
			"to exactly render as",
			<span>{""}</span>,
		));

	it("renders a translated message", () =>
		expect(
			<Text message={{ id: "test.msg", defaultMessage: "Test message" }} />,
			"renders elements",
			"to render as",
			<FormattedMessage id="test.msg" defaultMessage="Test message" />,
		));

	it("renders an error", () =>
		expect(
			<Text message="Test message" error={{ message: "This failed" }} />,
			"renders elements",
			"to render as",
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				Errored: This failed
			</span>,
		));

	it("renders an error if no message given", () =>
		expect(
			<Text />,
			"renders elements",
			"to render as",
			<span
				style={{
					color: "red",
					backgroundColor: "white",
					fontWeight: "bold",
				}}
			>
				Errored: No message provided
			</span>,
		));
});
