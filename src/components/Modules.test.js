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
						label: "Page 1",
					},
					"/page2": {
						component: Page2,
						label: "Page 2",
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

	it("renders a main page", () =>
		expect(
			<Module name="demos" component={Mod3} />,
			"renders elements",
			"to render as",
			<React.Fragment>
				<RenderFragment forRoute="/">
					<Mod3 />
				</RenderFragment>
			</React.Fragment>,
		));

	it("renders subpages", () =>
		expect(
			<Module name="photos" pages={modules.photos.pages} component={Mod2} />,
			"renders elements",
			"to render as",
			<React.Fragment>
				<RenderFragment key="/:page3" forRoute="/:page3">
					<Page3 />
				</RenderFragment>
				<RenderFragment forRoute="/">
					<Mod2 />
				</RenderFragment>
			</React.Fragment>,
		));

	it("renders segment mode", () =>
		expect(
			<Module
				name="users"
				pages={modules.users.pages}
				mode="segments"
				root="/foo/bar"
			/>,
			"renders elements",
			"to render as",
			<Segments pages={modules.users.pages} root="/foo/bar" />,
		));
});
