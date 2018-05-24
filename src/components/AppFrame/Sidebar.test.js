import React from "react";
import Sidebar, { Bar } from "./Sidebar";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let pages;
	beforeEach(() => {
		pages = [
			{
				icon: "cars",
				label: "First page",
				href: "/first",
			},
		];
	});

	it("renders a sidebar with app selector and page menu", () =>
		expect(
			<Sidebar pages={pages} />,
			"to render as",
			<Bar>
				<MenuItem menu icon="menu" />
				<MenuItem icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open pages={pages} />,
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
