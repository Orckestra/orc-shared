import React from "react";
import Button from "./Button";
import Text from "./Text";
import IconButton, { ButtonIcon, ButtonText } from "./IconButton";

describe("IconButton", () => {
	it("renders a button with an icon", () =>
		expect(
			<IconButton icon="test" otherProp />,
			"when mounted",
			"to satisfy",
			<Button otherProp>
				<ButtonIcon id="test" />
			</Button>,
		));

	it("renders a button with a label", () =>
		expect(
			<IconButton label="Message" random="foo" />,
			"when mounted",
			"to satisfy",
			<Button random="foo">
				<ButtonText>
					<Text message="Message" />
				</ButtonText>
			</Button>,
		));

	it("renders a button with both an icon and a label", () =>
		expect(
			<IconButton icon="test" label="Message" passThru={[1, 2, 3]} />,
			"when mounted",
			"to satisfy",
			<Button passThru={[1, 2, 3]}>
				<ButtonIcon id="test" />
				<ButtonText>
					<Text message="Message" />
				</ButtonText>
			</Button>,
		));
});
