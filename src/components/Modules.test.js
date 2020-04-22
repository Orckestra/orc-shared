import React from "react";
import Immutable from "immutable";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount } from "unexpected-reaction";
import { getStyledClassSelector } from "../utils/testUtils";
import { TabBar, ScrollableBar } from "./Navigation/Bar";
import { ModuleTab, TabLink, ModuleIcon, TabText } from "./Navigation/Tab";
import {
	Wrapper as SegmentWrapper,
	List as SegmentList,
	Item as SegmentItem,
} from "./Routing/SegmentPage";
import { Modules } from "./Modules";

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
			settings: {
				defaultScope: "myScope",
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
			getStyledClassSelector(TabBar),
			"to satisfy",
			<MemoryRouter initialEntries={["/TestScope/demos"]}>
				<TabBar>
					<ModuleTab active>
						<TabLink to="/TestScope/demos">
							<ModuleIcon id="cloud" />
							<TabText>Module 3</TabText>
						</TabLink>
					</ModuleTab>
					<ScrollableBar />
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
								<TabText>Module 1</TabText>
							</TabLink>
						</ModuleTab>
						<ScrollableBar />
					</TabBar>
				</MemoryRouter>,
				<MemoryRouter initialEntries={["/TestScope/users/page1"]}>
					<SegmentWrapper>
						<SegmentList>
							<SegmentItem to="/TestScope/users/page1" active>
								Page 1
							</SegmentItem>
							<SegmentItem to="/TestScope/users/page2">Page 2</SegmentItem>
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
								<TabText>Module 2</TabText>
							</TabLink>
						</ModuleTab>
						<ScrollableBar />
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
								<TabText>Module 3</TabText>
							</TabLink>
						</ModuleTab>
						<ScrollableBar />
					</TabBar>
				</MemoryRouter>,
				<Mod3 />,
			],
		));
});
