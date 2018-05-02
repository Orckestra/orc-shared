import React from "react";
import Sidebar, * as childComponents from "./Sidebar";
const { Bar, SidebarAppSelector, SidebarMenuItem } = childComponents;

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
				<SidebarAppSelector
					applications={applications}
					applicationId="current"
				/>
				<SidebarMenuItem menu icon="menu" />
				<SidebarMenuItem icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders an open sidebar", () =>
		expect(
			<Sidebar open pages={pages} />,
			"to render as",
			<Bar>
				<SidebarAppSelector open />
				<SidebarMenuItem menu open icon="layers" />
				<SidebarMenuItem open icon="cars" label="First page" href="/first" />
			</Bar>,
		));

	it("renders a minimal sidebar", () =>
		expect(
			<Sidebar />,
			"to render as",
			<Bar>
				<SidebarAppSelector />
				<SidebarMenuItem menu icon="menu" />
			</Bar>,
		));

	["SidebarAppSelector", "SidebarMenuItem"].forEach(compName => {
		const Component = childComponents[compName];
		describe(compName, () => {
			it("will transition movement", () =>
				expect(
					<Component />,
					"to render style rules",
					"to contain",
					"transition: transform 0.3s ease-out;",
				));

			it("shifts outward when open", () =>
				expect(
					<Component open />,
					"to render style rules",
					"to contain",
					"transform: translateX(19px);",
				));

			it("does not shift outward when closed", () =>
				expect(
					<Component />,
					"to render style rules",
					"to contain",
					"transform: translateX(0px);",
				));
		});
	});
});
