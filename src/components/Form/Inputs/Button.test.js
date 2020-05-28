import React from "react";
import { Provider } from "react-redux";
import { FormButton, PositionedButton } from "./Button";

describe("FormButton", () => {
	let update;
	beforeEach(() => {
		update = () => {};
	});

	it("renders a button showing an icon", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<FormButton id="testId" update={update} icon="test-icon" otherProp />
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
				<PositionedButton id="testId" otherProp onClick={update} icon="test-icon" />
			</Provider>,
		));

	it("renders a button showing a text", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<FormButton id="testId" update={update} buttonText="Push this" otherProp />
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
				<PositionedButton id="testId" otherProp onClick={update} label="Push this" />
			</Provider>,
		));

	it("renders a button showing both an icon and a text", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<FormButton
					id="testId"
					update={update}
					icon="test-icon"
					buttonText="Push this"
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
				<PositionedButton
					id="testId"
					otherProp
					onClick={update}
					icon="test-icon"
					label="Push this"
				/>
			</Provider>,
		));
});
