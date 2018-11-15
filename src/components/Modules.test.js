import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Navigation from "./Navigation";
import Segments from "./Segments";
import { Modules, Module } from "./Modules";

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3;
	beforeEach(() => {
		Mod2 = () => <div />;
		Mod3 = () => <div />;
		Page1 = () => <div />;
		Page2 = () => <div />;
		Page3 = () => <div />;
		modules = {
			users: {
				label: "Module 1",
				icon: "user",
				mode: "segments",
				pages: {
					"/page1": {
						component: Page1,
						title: "Page 1",
					},
					"/page2": {
						component: Page2,
						title: "Page 2",
					},
				},
			},
			photos: {
				label: "Module 2",
				icon: "image",
				component: Mod2,
				pages: {
					"/:page3": {
						component: Page3,
						title: "Page 3",
					},
				},
			},
			demos: {
				label: "Module 3",
				icon: "cloud",
				component: Mod3,
			},
		};
	});

	it("renders a module table as a routing system with navigation tabs", () =>
		expect(
			<Modules modules={modules} scope="TestScope" />,
			"to render as",
			<React.Fragment>
				<Navigation modules={modules} />
				<RenderFragment key="users" forRoute="/users">
					<Module
						name="users"
						pages={modules.users.pages}
						mode="segments"
						root="/TestScope/users"
					/>
				</RenderFragment>
				<RenderFragment key="photos" forRoute="/photos">
					<Module
						name="photos"
						pages={modules.photos.pages}
						component={Mod2}
						root="/TestScope/photos"
					/>
				</RenderFragment>
				<RenderFragment key="demos" forRoute="/demos">
					<Module name="demos" component={Mod3} root="/TestScope/demos" />
				</RenderFragment>
			</React.Fragment>,
		));
});

describe("Module", () => {
	let modules, Mod1, Mod2, Mod3, Page1, Page2, Page3;
	beforeEach(() => {
		Mod1 = () => <div />;
		Mod2 = () => <div />;
		Mod3 = () => <div />;
		Page1 = () => <div />;
		Page2 = () => <div />;
		Page3 = () => <div />;
		modules = {
			users: {
				name: "users",
				label: "Module 1",
				icon: "user",
				mode: "segments",
				pages: {
					"/page1": {
						name: "page1",
						component: Page1,
						label: "Page 1",
					},
					"/page2": {
						name: "page2",
						component: Page2,
						label: "Page 2",
					},
				},
			},
			photos: {
				name: "photos",
				label: "Module 2",
				icon: "image",
				component: Mod1,
				pages: {
					"/:page3": {
						name: "page3",
						component: Page3,
						title: "Page 3",
					},
					"/page4": {
						name: "page4",
						label: "Page 4",
						mode: "segments",
						pages: {
							"/page1": {
								name: "page1",
								component: Page1,
								label: "Page 1",
							},
							"/page2": {
								name: "page2",
								component: Page2,
								label: "Page 2",
							},
						},
					},
				},
			},
			demos: {
				name: "demos",
				label: "Module 3",
				icon: "cloud",
				component: Mod2,
			},
			fail: {
				name: "fail",
				label: "Fault",
				icon: "explosion",
			},
			subpagefail: {
				name: "subpagefail",
				label: "Subpage failure",
				icon: "explosion",
				component: Mod3,
				pages: {
					"/missing": {
						name: "missing",
						label: "Missing component",
					},
				},
			},
		};
	});

	it("renders a main page", () =>
		expect(
			<Module {...modules.demos} />,
			"renders elements",
			"to render as",
			<React.Fragment>
				<RenderFragment forRoute="/">
					<Mod2 />
				</RenderFragment>
			</React.Fragment>,
		));

	it("renders segment mode", () =>
		expect(
			<Module {...modules.users} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<Segments pages={modules.users.pages} root="/foo/bar" />,
		));

	it("renders subpages", () =>
		expect(
			<Module {...modules.photos} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<React.Fragment>
				<RenderFragment key="/:page3" forRoute="/:page3">
					<Page3 />
				</RenderFragment>
				<RenderFragment key="/page4" forRoute="/page4">
					<Segments
						pages={modules.photos.pages["/page4"].pages}
						root="/foo/bar/page4"
					/>
				</RenderFragment>
				<RenderFragment forRoute="/">
					<Mod1 />
				</RenderFragment>
			</React.Fragment>,
		));

	it("renders error messages", () =>
		expect(
			<Module {...modules.demos} error={{ message: "Mock error" }} />,
			"renders elements",
			"to render as",
			<span>Module demos errored: Mock error</span>,
		));

	it("renders an error if no component to render", () =>
		expect(
			<Module {...modules.fail} />,
			"renders elements",
			"to render as",
			<span>Module fail needs a renderable component</span>,
		));

	it("renders errors for missing components in segment pages", () =>
		expect(
			<Module {...modules.subpagefail} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<React.Fragment>
				<span>
					Page missing under module subpagefail did not have a renderable
					component
				</span>
				<RenderFragment forRoute="/">
					<Mod3 />
				</RenderFragment>
			</React.Fragment>,
		));
});
