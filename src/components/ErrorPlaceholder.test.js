import React from "react";
import { Provider } from "react-redux";
import Placeholder from "./MaterialUI/DataDisplay/PredefinedElements/Placeholder";
import ErrorPlaceholder from "./ErrorPlaceholder";

describe("ErrorPlaceholder", () => {
	it("shows an error icon and message", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ErrorPlaceholder message="Error" />
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
				<Placeholder icon="report-problem-triangle" error title="Error" />
			</Provider>,
		));

	it("gets icon from theme and shows description", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ErrorPlaceholder message="Error" description="This failed" />
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
				<Placeholder icon="report-problem-triangle" error title="Error" subtitle="This failed" />
			</Provider>,
		));

	it("passes through an onClick handler", () => {
		const handler = () => {};
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ErrorPlaceholder message="Error" onClick={handler} />
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
				<Placeholder icon="report-problem-triangle" error title="Error" onClick={handler} />
			</Provider>,
		);
	});
});
