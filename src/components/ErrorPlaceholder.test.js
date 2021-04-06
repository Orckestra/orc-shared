import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Placeholder from "./Placeholder";
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
				<ThemeProvider theme={{}}>
					<ErrorPlaceholder message="Error" />
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
				<Placeholder icon="error" warn title="Error" />
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
				<ThemeProvider theme={{ icons: { error: "error" } }}>
					<ErrorPlaceholder message="Error" description="This failed" />
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
				<Placeholder icon="error" warn title="Error" subtitle="This failed" />
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
				<ThemeProvider theme={{}}>
					<ErrorPlaceholder message="Error" onClick={handler} />
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
				<Placeholder icon="error" warn title="Error" onClick={handler} />
			</Provider>,
		);
	});
});
