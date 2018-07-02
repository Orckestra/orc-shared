import React from "react";
import { FormattedMessage } from "react-intl";
import Text from "./Text";

describe("Text", () => {
	it("renders a simple message", () =>
		expect(
			<Text message="Test message" />,
			"to render as",
			<span>Test message</span>,
		));

	it("renders a translated message", () =>
		expect(
			<Text message={{ id: "test.msg", defaultMessage: "Test message" }} />,
			"to render as",
			<FormattedMessage id="test.msg" defaultMessage="Test message" />,
		));
});
