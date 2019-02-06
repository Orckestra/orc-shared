import React from "react";
import { shallow } from "enzyme";
import { Switch } from "react-router-dom";
import Navigation from "./Navigation";
import FullPage from "./Routing/FullPage";
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
			path: "/:scope/users",
			render: expect.it("to be a function"),
		});
		expect(
			userRoute
				.renderProp("render")()
				.contains(<Module config={modules.users} path="/:scope/users" />),
			"to be true",
		);

		const photoRoute = wrapper.find(Switch).childAt(1);
		expect(photoRoute.key(), "to be", "photos");
		expect(photoRoute.props(), "to satisfy", {
			path: "/:scope/photos",
			render: expect.it("to be a function"),
		});
		expect(
			photoRoute
				.renderProp("render")()
				.contains(<Module config={modules.photos} path="/:scope/photos" />),
			"to be true",
		);

		const demoRoute = wrapper.find(Switch).childAt(2);
		expect(demoRoute.key(), "to be", "demos");
		expect(demoRoute.props(), "to satisfy", {
			path: "/:scope/demos",
			render: expect.it("to be a function"),
		});
		expect(
			demoRoute
				.renderProp("render")()
				.contains(<Module config={modules.demos} path="/:scope/demos" />),
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
			<Module config={modules.demos} path="/foo/bar" />,
			"renders elements",
			"to render as",
			<FullPage path="/foo/bar" config={modules.demos} />,
		));
});
