import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount } from "react-dom-testing";
import { TabBar } from "./Navigation/Bar";
import { ModuleTab, TabLink, ModuleIcon, TabText } from "./Navigation/Tab";
import {
	Wrapper as SegmentWrapper,
	List as SegmentList,
	Item as SegmentItem,
} from "./Routing/SegmentPage";
import { Modules } from "./Modules";

const getClassName = elm => {
	const renderer = new ShallowRenderer();
	return renderer.render(elm).props.className.split(" ")[1];
};

describe("Modules", () => {
	let modules, Mod2, Mod3, Page1, Page2, Page3, store, state;
	beforeEach(() => {
		Mod2 = () => <div id="Mod2" />;
		Mod3 = () => <div id="Mod3" />;
		Page1 = () => <div id="Page1" />;
		Page2 = () => <div id="Page2" />;
		Page3 = () => <div id="Page3" />;
		modules = {
			users: {
				label: "Module 1",
				icon: "user",
				segments: {
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
						label: "Page 3",
					},
				},
			},
			demos: {
				label: "Module 3",
				icon: "cloud",
				component: Mod3,
			},
		};
		state = Immutable.fromJS({
			navigation: {
				tabIndex: {},
				moduleTabs: {},
				mappedHrefs: {},
				route: {},
			},
			router: {
				location: {},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
	});

	it("renders a module table with navigation tabs", () =>
		expect(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/TestScope/demos"]}>
					<Modules modules={modules} scope="TestScope" />
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"queried for first",
			"." + getClassName(<TabBar />),
			"to satisfy",
			<MemoryRouter initialEntries={["/TestScope/demos"]}>
				<TabBar>
					<ModuleTab active>
						<TabLink to="/TestScope/demos">
							<ModuleIcon id="cloud" />
							<TabText>
								<span>Module 3</span>
							</TabText>
						</TabLink>
					</ModuleTab>
				</TabBar>
			</MemoryRouter>,
		));

	it("renders a module table as a routing system (user route)", () =>
		expect(
			mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
						<Modules modules={modules} scope="TestScope" />
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
					<TabBar>
						<ModuleTab>
							<TabLink to="/TestScope/users">
								<ModuleIcon id="user" />
								<TabText>
									<span>Module 1</span>
								</TabText>
							</TabLink>
						</ModuleTab>
					</TabBar>
				</MemoryRouter>,
				<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
					<SegmentWrapper>
						<SegmentList>
							<SegmentItem to="/TestScope/users/page1" active>
								<span>Page 1</span>
							</SegmentItem>
							<SegmentItem to="/TestScope/users/page2">
								<span>Page 2</span>
							</SegmentItem>
						</SegmentList>
						<Page1 />
					</SegmentWrapper>
				</MemoryRouter>,
			],
		));

	it("renders a module table as a routing system (photo route)", () =>
		expect(
			mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/photos"]}>
						<Modules modules={modules} scope="TestScope" />
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<MemoryRouter initialEntries={["/TestScope/photos"]}>
					<TabBar>
						<ModuleTab active>
							<TabLink to="/TestScope/photos">
								<ModuleIcon id="image" />
								<TabText>
									<span>Module 2</span>
								</TabText>
							</TabLink>
						</ModuleTab>
					</TabBar>
				</MemoryRouter>,
				<Mod2 />,
			],
		));

	it("renders a module table as a routing system (demo route)", () =>
		expect(
			mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={["/TestScope/demos"]}>
						<Modules modules={modules} scope="TestScope" />
					</MemoryRouter>
				</Provider>,
			).childNodes,
			"to satisfy",
			[
				<MemoryRouter initialEntries={["/TestScope/demos"]}>
					<TabBar>
						<ModuleTab active>
							<TabLink to="/TestScope/demos">
								<ModuleIcon id="cloud" />
								<TabText>
									<span>Module 3</span>
								</TabText>
							</TabLink>
						</ModuleTab>
					</TabBar>
				</MemoryRouter>,
				<Mod3 />,
			],
		));
});
