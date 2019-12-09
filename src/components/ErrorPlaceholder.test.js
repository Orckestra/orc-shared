import React from "react";
import { ThemeProvider } from "styled-components";
import Placeholder from "./Placeholder";
import ErrorPlaceholder from "./ErrorPlaceholder";

describe("ErrorPlaceholder", () => {
	it("shows an error icon and message", () =>
		expect(
			<ThemeProvider theme={{}}>
				<ErrorPlaceholder message="Error" />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<Placeholder icon="error" warn title="Error" />,
		));

	it("gets icon from theme and shows description", () =>
		expect(
			<ThemeProvider theme={{ icons: { error: "skull" } }}>
				<ErrorPlaceholder message="Error" description="This failed" />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<Placeholder icon="skull" warn title="Error" subtitle="This failed" />,
		));

	it("passes through an onClick handler", () => {
		const handler = () => {};
		return expect(
			<ThemeProvider theme={{}}>
				<ErrorPlaceholder message="Error" onClick={handler} />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<Placeholder icon="error" warn title="Error" onClick={handler} />,
		);
	});
});
