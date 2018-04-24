import React from "react";
import Sidebar, { Bar } from "./Sidebar";
import ApplicationSelector from "./ApplicationSelector";
import MenuItem from "./MenuItem";

describe("Sidebar", () => {
	let applications, pages;
	beforeEach(() => {
		applications = [
			{
				id: "current",
				label: "Test label",
				src: "/test/url",
			},
			{
				id: "other",
				label: "Test again",
				src: "/test/elsewhere",
			},
		];
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
			<Sidebar
				applications={applications}
				applicationId="current"
				pages={pages}
			/>,
			"to render as",
			<Bar>
				<ApplicationSelector
					applications={applications}
					applicationId="current"
				/>
				<MenuItem menu icon="menu" />
				<MenuItem icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open pages={pages} />,
			"to render as",
			<Bar>
				<ApplicationSelector open />
				<MenuItem menu open icon="layers" />
				<MenuItem open icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<Sidebar />,
			"to render as",
			<Bar>
				<ApplicationSelector />
				<MenuItem menu icon="menu" />
			</Bar>,
		));

	describe("Bar", () => {
		it("shifts contents outward when open", () =>
			expect(
				<Bar open />,
				"to render style rules",
				"to match",
				/> \* \{[^}]*transform: translateX\(19px\);[^}]*\}/,
			));

		it("does not shift contents outward when closed", () =>
			expect(
				<Bar />,
				"to render style rules",
				"to match",
				/> \* \{[^}]*transform: translateX\(0px\);[^}]*\}/,
			));
	});
});
