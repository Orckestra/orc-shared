import React from "react";
import { Provider } from "react-redux";
import { mount, act } from "unexpected-reaction";
import sinon from "sinon";
import { spyOnConsole } from "../utils/testUtils";
import ErrorPlaceholder from "./ErrorPlaceholder";
import Loader, { Loading } from "./Loader";
import ColumnWrapper from "./ColumnWrapper";

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
			<div>
				<Loading />
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
				<use href="#icon-orckestra-loader" />
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
		let load;
		act(() => {
			load = Comp.load();
		});
		return load.then(() =>
			expect(
				loader,
				"to satisfy",
				<div>
					<ColumnWrapper />
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
				<div>
					<Comp />
				</div>
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
				<use href="#icon-orckestra-loader" />
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
					<div>
						<ErrorPlaceholder message="This is not right" />
					</div>
				</Provider>,
			).then(() => expect(console.error, "was called")),
		);
	});
});
