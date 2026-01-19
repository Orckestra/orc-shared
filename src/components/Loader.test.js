import React from "react";
import { Provider } from "react-redux";
import { mount, act } from "unexpected-reaction";
import sinon from "sinon";
import { createMuiTheme, spyOnConsole, TestWrapper } from "../utils/testUtils";
import ErrorPlaceholder from "./ErrorPlaceholder";
import Loader, { Loading } from "./Loader";
import ColumnWrapper from "./ColumnWrapper";
import LoadingIcon from "./LoadingIcon";

const theme = createMuiTheme();

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
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Loading />
				</div>
			</TestWrapper>,
		);
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(200);
		});
		expect(
			loader,
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<LoadingIcon />
				</div>
			</TestWrapper>,
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
					<Loading {...{ error }} />
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
					<ErrorPlaceholder message="This is a test" />
				</Provider>,
			);
		});
	});
});

describe("Loader", () => {
	let clock, componentLoader, errorLoader;
	beforeEach(() => {
		componentLoader = () => import("./ColumnWrapper");
		errorLoader = () => Promise.reject(new Error("This is not right"));
		clock = sinon.useFakeTimers();
	});
	afterEach(() => {
		clock.restore();
	});
	spyOnConsole(["error"]);

	it("loads the component", () => {
		const Comp = Loader(componentLoader);
		const loader = mount(
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Comp />
				</div>
			</TestWrapper>,
		);
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(200);
		});
		expect(
			loader,
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<LoadingIcon />
				</div>
			</TestWrapper>,
		);
		let load;
		act(() => {
			load = Comp.load();
		});
		return load.then(() =>
			expect(
				loader,
				"to satisfy",
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<div>
						<ColumnWrapper />
					</div>
				</TestWrapper>,
			).then(() => expect(console.error, "was not called")),
		);
	});

	it("errors out", () => {
		const Comp = Loader(errorLoader);
		const store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => ({}),
		};

		const loader = mount(
			<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<Comp />
				</div>
			</TestWrapper>,
		);
		expect(loader, "to satisfy", <div />);
		act(() => {
			clock.tick(200);
		});
		expect(
			loader,
			"to satisfy",
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<LoadingIcon />
				</div>
			</TestWrapper>,
		);
		let load;
		act(() => {
			load = Comp.load().catch(() => {});
		});
		return load.then(() =>
			expect(
				loader,
				"to satisfy",
				<TestWrapper provider={{ store }} stylesProvider muiThemeProvider={{ theme }}>
					<div>
						<ErrorPlaceholder message="This is not right" />
					</div>
				</TestWrapper>,
			).then(() => expect(console.error, "was called")),
		);
	});
});
