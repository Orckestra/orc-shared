import React from "react";
import { ThemeProvider } from "styled-components";
import Placeholder from "./Placeholder";
import LoadingIcon from "./LoadingIcon";

describe("LoadingIcon", () => {
	it("shows a spinning load icon", () =>
		expect(
			<ThemeProvider theme={{}}>
				<LoadingIcon />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<Placeholder icon="loading" animate />,
		));

	it("gets icon from theme", () =>
		expect(
			<ThemeProvider theme={{ icons: { loading: "spinner" } }}>
				<LoadingIcon />
			</ThemeProvider>,
			"when mounted",
			"to satisfy",
			<Placeholder icon="spinner" animate />,
		));
});
