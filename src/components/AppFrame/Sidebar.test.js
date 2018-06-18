import React from "react";
import Sidebar, { Bar } from "./Sidebar";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let modules;
	beforeEach(() => {
		modules = [
			{
				icon: "cars",
				label: "First page",
				href: "/first",
			},
		];
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<Sidebar modules={modules} />,
			"to render as",
			<Bar>
				<MenuItem menu icon="menu" />
				<MenuItem icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open modules={modules} />,
			"to render as",
			<Bar>
				<MenuItem menu open icon="layers" />
				<MenuItem open icon="cars" label="First page" href="/first" />
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
