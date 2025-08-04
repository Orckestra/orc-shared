import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import FormButton from "./Button";
import Button from "@material-ui/core/Button";
import Icon from "../../MaterialUI/DataDisplay/Icon";

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
				<IntlProvider locale="en">
					<FormButton id="testId" update={update} icon="test-icon" otherProp />
				</IntlProvider>
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
				<Button id="testId" otherProp onClick={update} startIcon={<Icon id="test-icon" />} variant="outlined"></Button>
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
				<IntlProvider locale="en">
					<FormButton
						id="testId"
						update={update}
						buttonText={{ id: "PushThis", defaultMessage: "Push this" }}
						otherProp
					/>
				</IntlProvider>
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
				<Button id="testId" otherProp onClick={update} variant="outlined">
					Push this
				</Button>
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
				<IntlProvider locale="en">
					<FormButton
						id="testId"
						update={update}
						icon="test-icon"
						buttonText={{ id: "PushThis", defaultMessage: "Push this" }}
						primary
						otherProp
					/>
				</IntlProvider>
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
				<Button id="testId" otherProp onClick={update} startIcon={<Icon id="test-icon" />} variant="outlined">
					Push this
				</Button>
			</Provider>,
		));
});
