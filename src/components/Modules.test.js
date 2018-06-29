import React from "react";
import { ImmutableFragment as RenderFragment } from "redux-little-router/lib/immutable";
import Navigation from "./Navigation";
import Modules from "./Modules";

describe("Modules", () => {
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
				label: "Module 1",
				icon: "user",
				component: Mod1,
				pages: {
					"/:page1": {
						component: Page1,
						title: "Page 1",
					},
					"/:page2": {
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
			<Modules modules={modules} />,
			"to render as",
			<React.Fragment>
				<Navigation modules={modules} />
				<RenderFragment key="users" forRoute="/users">
					<React.Fragment>
						<RenderFragment key="/:page1" forRoute="/:page1">
							<Page1 />
						</RenderFragment>
						<RenderFragment key="/:page2" forRoute="/:page2">
							<Page2 />
						</RenderFragment>
						<RenderFragment forRoute="/">
							<Mod1 />
						</RenderFragment>
					</React.Fragment>
				</RenderFragment>
				<RenderFragment key="photos" forRoute="/photos">
					<React.Fragment>
						<RenderFragment key="/:page3" forRoute="/:page3">
							<Page3 />
						</RenderFragment>
						<RenderFragment forRoute="/">
							<Mod2 />
						</RenderFragment>
					</React.Fragment>
				</RenderFragment>
				<RenderFragment key="demos" forRoute="/demos">
					<React.Fragment>
						<RenderFragment forRoute="/">
							<Mod3 />
						</RenderFragment>
					</React.Fragment>
				</RenderFragment>
			</React.Fragment>,
		));
});
