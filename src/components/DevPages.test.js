import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import Spritesheet from "./Spritesheet";
import DevPages from "./DevPages";

const TestComp = () => <div />;

describe("DevPages", () => {
	let store, state;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => Immutable.fromJS(state),
		};
		state = {
			router: {
				pathname: null,
			},
		};
	});

	describe("route '/outside'", () => {
		beforeEach(() => {
			state.router.pathname = "/outside";
		});

		it("shows child", () =>
			expect(
				<Provider store={store}>
					<DevPages>
						<TestComp />
					</DevPages>
				</Provider>,
				"when deeply rendered",
			).then(render =>
				expect(render, "to contain", <TestComp />).and(
					"not to contain",
					<Spritesheet />,
				),
			));
	});

	describe("route '/dev/sprites'", () => {
		beforeEach(() => {
			state.router.pathname = "/dev/sprites";
		});

		it("shows a sprite sheet", () =>
			expect(
				<Provider store={store}>
					<DevPages>
						<TestComp />
					</DevPages>
				</Provider>,
				"when deeply rendered",
			).then(render =>
				expect(render, "not to contain", <TestComp />).and(
					"to contain",
					<Spritesheet />,
				),
			));
	});
});
