import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { mount, act } from "unexpected-reaction";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import ErrorPlaceholder from "./ErrorPlaceholder";
import { PlaceholderBox, PlaceholderIcon } from "./Placeholder";
import Loader from "./Loader";

describe("Loader", () => {
	spyOnConsole(["error"]);
	let clock, TestComp, compLoader, errorLoader;
	beforeEach(() => {
		TestComp = () => <div id="test" />;
		compLoader = () => Promise.resolve({ default: TestComp });
		errorLoader = () => Promise.reject(new Error("This is not right"));
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});

	it("loads and renders the component", () => {
		const Comp = Loader(compLoader);
		const loader = mount(
			<ThemeProvider theme={{}}>
				<div>
					<Comp />
				</div>
			</ThemeProvider>,
		);
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(100);
		});
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(100);
		});
		expect(
			loader,
			"to satisfy",
			<div>
				<PlaceholderBox>
					<PlaceholderIcon id="loading" animate />
				</PlaceholderBox>
			</div>,
		);
		let load;
		act(() => {
			load = Comp.load();
		});
		return load
			.then(() =>
				expect(
					loader,
					"to satisfy",
					<div>
						<TestComp />
					</div>,
				),
			)
			.then(() => expect(console.error, "was not called"));
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
			clock.tick(100);
		});
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(100);
		});
		expect(
			loader,
			"to satisfy",
			<div>
				<PlaceholderBox>
					<PlaceholderIcon id="loading" animate />
				</PlaceholderBox>
			</div>,
		);
		let load;
		act(() => {
			load = Comp.load().catch(() => {});
		});
		return load
			.then(() =>
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
				),
			)
			.then(() => expect(console.error, "was called"));
	});
});
