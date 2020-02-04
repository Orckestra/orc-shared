import React from "react";
import { Provider } from "react-redux";
import Tooltip from "../../Tooltip";
import { SmallButton, RoundButton, ButtonIcon } from "./SmallButton";

describe("SmallButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a small button showing an icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<SmallButton
					id="testId"
					update={update}
					icon="test-icon"
					altText="Alternative"
					otherProp
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<RoundButton id="testId" otherProp onClick={update}>
					<ButtonIcon id="test-icon" />
					<Tooltip message="Alternative" />
				</RoundButton>
			</Provider>,
		));

	it("adds an ugly default alt text if none given, shaming the dev", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<SmallButton id="testId" icon="test-icon" />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<RoundButton id="testId">
					<ButtonIcon id="test-icon" />
					<Tooltip message="[altText]" />
				</RoundButton>
			</Provider>,
		));
});
