import React from "react";
import Immutable from "immutable";
import Sidebar, { Bar, EnhancedMenuItem } from "./Sidebar";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let modules;
	beforeEach(() => {
		modules = [
			{
				id: "first",
				icon: "cars",
				label: "First page",
			},
		];
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<Sidebar modules={modules} />,
			"to render as",
			<Bar>
				<MenuItem menu icon="menu" />
				<EnhancedMenuItem icon="cars" id="first" label="First page" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open modules={modules} />,
			"to render as",
			<Bar>
				<MenuItem menu open icon="layers" />
				<EnhancedMenuItem open icon="cars" id="first" label="First page" />
			</Bar>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<Sidebar />,
			"to render as",
			<Bar>
				<MenuItem menu icon="menu" />
			</Bar>,
		));
});

describe("EnhancedMenuItem", () => {
	let store;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () =>
				Immutable.fromJS({
					router: {
						params: {},
					},
				}),
		};
	});

	it("renders a MenuItem with href and onClick", () =>
		expect(
			<EnhancedMenuItem id="route" store={store} />,
			"to deeply render as",
			<MenuItem href="/Global/route" onClick={expect.it("to be a function")} />,
		));
});
