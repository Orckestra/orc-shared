import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { mount, act } from "react-dom-testing";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import ErrorPlaceholder from "./ErrorPlaceholder";
import Loader, { Loading } from "./Loader";

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
		it("renders an error placeholder if error set", () => {
			const error = new Error("This is a test");
			return expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ThemeProvider theme={{}}>
						<Loading {...{ error }} />
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
						<ErrorPlaceholder message="This is a test" />
					</ThemeProvider>
				</Provider>,
			);
		});
	});
});

describe("Loader", () => {
	let clock, buttonLoader, errorLoader;
	beforeEach(() => {
		buttonLoader = () => import("./Button");
		errorLoader = () => Promise.reject(new Error("This is not right"));
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});
	spyOnConsole(["error"]);

	it("loads the component", () => {
		const Comp = Loader(buttonLoader);
		const loader = mount(
			<ThemeProvider theme={{}}>
				<div>
					<Comp />
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
				<use />
			</svg>,
		);
		let load;
		act(() => {
			load = Comp.load();
		});
		return load.then(() =>
			expect(
				loader,
				"to satisfy",
				<div>
					<button />
				</div>,
			).then(() => expect(console.error, "was not called")),
		);
	});

	it("errors out", () => {
		const Comp = Loader(errorLoader);
		const loader = mount(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<ThemeProvider theme={{}}>
					<div>
						<Comp />
					</div>
				</ThemeProvider>
			</Provider>,
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
				<use href="#icon-loading" />
			</svg>,
		);
		let load;
		act(() => {
			load = Comp.load().catch(() => {});
		});
		return load.then(() =>
			expect(
				loader,
				"to satisfy",
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<ThemeProvider theme={{}}>
						<div>
							<ErrorPlaceholder message="This is not right" />
						</div>
					</ThemeProvider>
				</Provider>,
			).then(() => expect(console.error, "was called")),
		);
	});
});
