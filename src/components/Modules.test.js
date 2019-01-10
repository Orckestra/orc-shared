import React from "react";
import { shallow } from "enzyme";
import { Route, Switch } from "react-router-dom";
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

	it("renders a module table as a routing system with navigation tabs", () => {
		const wrapper = shallow(<Modules modules={modules} scope="TestScope" />);
		expect(wrapper.contains(<Navigation modules={modules} />), "to be true");

		const userRoute = wrapper.find(Switch).childAt(0);
		expect(userRoute.key(), "to be", "users");
		expect(userRoute.props(), "to satisfy", {
			path: "/TestScope/users",
			render: expect.it("to be a function"),
		});
		expect(
			userRoute
				.renderProp("render")()
				.contains(
					<Module
						name="users"
						pages={modules.users.pages}
						mode="segments"
						root="/TestScope/users"
					/>,
				),
			"to be true",
		);

		const photoRoute = wrapper.find(Switch).childAt(1);
		expect(photoRoute.key(), "to be", "photos");
		expect(photoRoute.props(), "to satisfy", {
			path: "/TestScope/photos",
			render: expect.it("to be a function"),
		});
		expect(
			photoRoute
				.renderProp("render")()
				.contains(
					<Module
						name="photos"
						pages={modules.photos.pages}
						component={Mod2}
						root="/TestScope/photos"
					/>,
				),
			"to be true",
		);

		const demoRoute = wrapper.find(Switch).childAt(2);
		expect(demoRoute.key(), "to be", "demos");
		expect(demoRoute.props(), "to satisfy", {
			path: "/TestScope/demos",
			render: expect.it("to be a function"),
		});
		expect(
			demoRoute
				.renderProp("render")()
				.contains(
					<Module name="demos" component={Mod3} root="/TestScope/demos" />,
				),
			"to be true",
		);
	});
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
			<Module {...modules.demos} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<Switch>
				<Route path="/foo/bar/" component={Mod2} />
			</Switch>,
		));

	it("renders segment mode", () =>
		expect(
			<Module {...modules.users} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<Segments pages={modules.users.pages} root="/foo/bar" />,
		));

	it("renders subpages", () => {
		expect(
			<Module {...modules.photos} root="/foo/bar" />,
			"renders elements",
			"to render as",
			<Switch>
				<Route key="/:page3" path="/foo/bar/:page3" component={Page3} />
				<Route
					key="/page4"
					path="/foo/bar/page4"
					render={expect.it("to be a function")}
				/>
				<Route exact path="/foo/bar/" component={Mod1} />
			</Switch>,
		);

		const segmentRender = shallow(
			<Module {...modules.photos} root="/foo/bar" />,
		)
			.dive()
			.childAt(1)
			.renderProp("render")();
		expect(
			segmentRender.contains(
				<Segments
					pages={modules.photos.pages["/page4"].pages}
					root="/foo/bar/page4"
				/>,
			),
			"to be true",
		);
	});

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
			<span>
				Page missing under module subpagefail did not have a renderable
				component
			</span>,
		));
});
