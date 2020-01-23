import React from "react";
import { ThemeProvider } from "styled-components";
import { mount, act } from "react-dom-testing";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import ErrorPlaceholder from "./ErrorPlaceholder";
import { Loading } from "./Loader";

describe("Loader placeholder", () => {
	let clock;
	beforeEach(() => {
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("renders null, then load spinner if no props set", () => {
		const loader = mount(
			<ThemeProvider theme={{ icons: { loading: "test-loader" } }}>
				<div>
					<Loading />
				</div>
			</ThemeProvider>,
		);
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(200);
		});
		expect(
			loader,
			"queried for first",
			"svg",
			"to satisfy",
			<svg>
				<use href="#icon-test-loader" />
			</svg>,
		);
	});

	describe("error state", () => {
		spyOnConsole(["error"]);

		it("renders an error placeholder if error set", () => {
			const error = new Error("This is a test");
			return expect(
				<ThemeProvider theme={{}}>
					<Loading {...{ error }} />
				</ThemeProvider>,
				"when mounted",
				"to satisfy",
				<ThemeProvider theme={{}}>
					<ErrorPlaceholder message="This is a test" />
				</ThemeProvider>,
			).then(() =>
				expect(console.error, "to have calls satisfying", [
					{ args: [new Error("This is a test")] },
				]),
			);
		});
	});
});
