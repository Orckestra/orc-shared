import React from "react";
import { Provider } from "react-redux";
import Button from "./Button";
import IconButton, { ButtonIcon, ButtonText } from "./IconButton";

describe("IconButton", () => {
	it("renders a button with an icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IconButton icon="test" otherProp />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Button otherProp>
				<ButtonIcon id="test" />
			</Button>,
		));

	it("renders a button with a label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IconButton label="Message" random="foo" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Button random="foo">
				<ButtonText>Message</ButtonText>
			</Button>,
		));

	it("renders a button with both an icon and a label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<IconButton icon="test" label="Message" passThru={[1, 2, 3]} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Button passThru={[1, 2, 3]}>
				<ButtonIcon id="test" />
				<ButtonText>Message</ButtonText>
			</Button>,
		));
});
