import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { spyOnConsole } from "../utils/testUtils";
import LoadingIcon from "./LoadingIcon";
import ErrorPlaceholder from "./ErrorPlaceholder";
import { Loading } from "./Loader";

describe("Loader placeholder", () => {
	it("renders null if no props set", () =>
		expect(
			<ThemeProvider theme={{}}>
				<div>
					<Loading />
				</div>
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<div />,
		));

	it("renders a load spinner is pastDelay flag set", () =>
		expect(
			<ThemeProvider theme={{}}>
				<Loading pastDelay />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<ThemeProvider theme={{}}>
				<LoadingIcon />
			</ThemeProvider>,
		));

	describe("error state", () => {
		spyOnConsole(["error"]);

		it("renders an error placeholder if error set", () => {
			const error = new Error("This is a test");
			const retry = () => {};
			return expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ThemeProvider theme={{}}>
						<Loading {...{ error, retry }} />
					</ThemeProvider>
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
					<ThemeProvider theme={{}}>
						<ErrorPlaceholder message="This is a test" onClick={retry} />
					</ThemeProvider>
				</Provider>,
			).then(() =>
				expect(console.error, "to have calls satisfying", [
					{ args: [new Error("This is a test")] },
				]),
			);
		});
	});
});
