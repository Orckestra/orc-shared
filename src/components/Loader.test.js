import React from "react";
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

	it("loads the component", () => {
		const Comp = Loader(buttonLoader);
		const loader = mount(
			<div>
				<Comp />
			</div>,
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
		let preload;
		act(() => {
			preload = Comp.preload();
		});
		return preload.then(() =>
			expect(
				loader,
				"to satisfy",
				<div>
					<button />
				</div>,
			),
		);
	});

	it("errors out", () => {
		const Comp = Loader(errorLoader);
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
				<use href="#icon-loading" />
			</svg>,
		);
		let preload;
		act(() => {
			preload = Comp.preload().catch(() => {});
		});
		return preload.then(() =>
			expect(
				loader,
				"to satisfy",
				<ThemeProvider theme={{}}>
					<div>
						<ErrorPlaceholder message="This is not right" />
					</div>
				</ThemeProvider>,
			),
		);
	});
});
