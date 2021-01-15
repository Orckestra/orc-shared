import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import sinon from "sinon";
import { getStyledClassSelector } from "../../utils/testUtils";
import Tab, { PageTab } from "./Tab";
import Bar, {
	TabBar,
	ScrollableBar,
	InnerBar,
	useTabScroll,
	StyledMenu,
	MenuButton,
} from "./Bar";

describe("Bar", () => {
	let closers;
	beforeEach(() => {
		closers = [0, 1, 2, 3].map(id => sinon.spy().named("close" + id));
	});

	it("renders a bar containing tabs", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<IntlProvider locale="en">
						<Bar
							module={{
								icon: "test",
								label: "A module",
								href: "/Foo/modu",
								mappedFrom: "/Foo/modu",
							}}
							pages={[
								{
									href: "/Foo/modu/1",
									mappedFrom: "/Foo/modu/1",
									label: "Page 1",
									mustTruncate: true,
									close: closers[0],
								},
								{
									href: "/Foo/modu/2",
									mappedFrom: "/Foo/modu/2",
									label: "Page 2",
									close: closers[1],
									active: true,
								},
								{
									href: "/Foo/modu/3",
									mappedFrom: "/Foo/modu/3",
									label: "Page 3",
									close: closers[2],
								},
								{
									href: "/Foo/modu/4",
									mappedFrom: "/Foo/modu/4",
									label: "Page 4",
									close: closers[3],
								},
							]}
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TabBar>
							<Tab
								key="/Foo/modu"
								module
								icon="test"
								href="/Foo/modu"
								mappedFrom="/Foo/modu"
								label="A module"
							/>
							<ScrollableBar>
								<Tab
									key="/Foo/modu/1"
									href="/Foo/modu/1"
									mappedFrom="/Foo/modu/1"
									label="Page 1"
									close={closers[0]}
									mustTruncate={true}
									hide={false}
								/>
								<Tab
									key="/Foo/modu/2"
									href="/Foo/modu/2"
									mappedFrom="/Foo/modu/2"
									label="Page 2"
									close={closers[1]}
									hide={false}
									active
								/>
								<Tab
									key="/Foo/modu/3"
									href="/Foo/modu/3"
									mappedFrom="/Foo/modu/3"
									label="Page 3"
									close={closers[2]}
									hide={false}
								/>
								<Tab
									key="/Foo/modu/4"
									href="/Foo/modu/4"
									mappedFrom="/Foo/modu/4"
									label="Page 4"
									close={closers[3]}
									hide={false}
								/>
							</ScrollableBar>
						</TabBar>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
		));

	it("renders a bar containing only module", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<IntlProvider locale="en">
						<Bar
							module={{
								icon: "test",
								label: "A module",
								href: "/Foo/modu",
								mappedFrom: "/Foo/modu",
								active: true,
							}}
							pages={[]}
						/>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
					<IntlProvider locale="en">
						<TabBar>
							<Tab
								key="/Foo/modu"
								module
								icon="test"
								href="/Foo/modu"
								mappedFrom="/Foo/modu"
								label="A module"
								active
							/>
							<ScrollableBar />
						</TabBar>
					</IntlProvider>
				</MemoryRouter>
			</Provider>,
		));

	it("hides tabs and shows dropdown when scrollable bar is too narrow to show them all", () => {
		// Needs to be fully rendered to work
		const root = document.createElement("div");
		document.body.append(root);
		const history = createMemoryHistory();
		sinon.spy(history, "push");
		ReactDOM.render(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Bar
							module={{
								icon: "test",
								label: "A module",
								href: "/Foo/modu",
								mappedFrom: "/Foo/modu",
							}}
							pages={[
								{
									href: "/Foo/modu/1",
									mappedFrom: "/Foo/modu/1",
									label: "Page 1",
									close: closers[0],
								},
								{
									href: "/Foo/modu/2",
									mappedFrom: "/Foo/modu/2",
									label: "Page 2",
									close: closers[1],
								},
								{
									href: "/Foo/modu/3",
									mappedFrom: "/Foo/modu/3",
									label: "Page 3",
									close: closers[2],
								},
								{
									href: "/Foo/modu/4",
									mappedFrom: "/Foo/modu/4",
									label: "Page 4",
									close: closers[3],
								},
							]}
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			root,
		);
		const bar = root.querySelector("*"); // Get the first child
		const barElement = bar.querySelector(getStyledClassSelector(InnerBar));
		const tabElements = barElement.querySelectorAll(getStyledClassSelector(PageTab));
		act(() => {
			// XXX: This is a nasty hack of jsdom, and may break unexpectedly
			Object.defineProperty(barElement, "offsetWidth", {
				value: 300,
				writable: true,
			});
			tabElements.forEach(tab => {
				Object.defineProperty(tab, "offsetWidth", {
					value: 130,
				});
			});
			window.dispatchEvent(new Event("resize"));
		});
		try {
			expect(
				bar,
				"to satisfy",
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<MemoryRouter>
						<IntlProvider locale="en">
							<TabBar>
								<Tab
									key="/Foo/modu"
									module
									icon="test"
									href="/Foo/modu"
									mappedFrom="/Foo/modu"
									label="A module"
								/>
								<ScrollableBar>
									<Tab
										key="/Foo/modu/1"
										href="/Foo/modu/1"
										mappedFrom="/Foo/modu/1"
										label="Page 1"
										close={closers[0]}
										hide={false}
									/>
									<Tab
										key="/Foo/modu/2"
										href="/Foo/modu/2"
										mappedFrom="/Foo/modu/2"
										label="Page 2"
										close={closers[1]}
										hide={false}
									/>
									<Tab
										key="/Foo/modu/3"
										href="/Foo/modu/3"
										mappedFrom="/Foo/modu/3"
										label="Page 3"
										close={closers[2]}
										hide={true}
									/>
									<Tab
										key="/Foo/modu/4"
										href="/Foo/modu/4"
										mappedFrom="/Foo/modu/4"
										label="Page 4"
										close={closers[3]}
										hide={true}
									/>
								</ScrollableBar>
								<StyledMenu
									id="navigationTabs"
									menuItems={[
										{ label: "Page 1", id: "/Foo/modu/1" },
										{ label: "Page 2", id: "/Foo/modu/2" },
										{ label: "Page 3", id: "/Foo/modu/3" },
										{ label: "Page 4", id: "/Foo/modu/4" },
									]}
								>
									<MenuButton />
								</StyledMenu>
							</TabBar>
						</IntlProvider>
					</MemoryRouter>
				</Provider>,
			);
			expect(history.push, "was not called");
			act(() => bar.querySelector("#navigationTabsAnchor").click());
			expect(bar, "queried for first", "ul", "to have text", "Page 1Page 2Page 3Page 4"); // Menu is showing
			act(() => bar.querySelector("#\\/Foo\\/modu\\/3").click());
			expect(history.push, "to have calls satisfying", [{ args: ["/Foo/modu/3"] }]);
		} finally {
			ReactDOM.unmountComponentAtNode(root);
			document.body.removeChild(root);
		}
	});
});

describe("useTabScroll", () => {
	// XXX: BE ADVISED!
	// These tests rely on hacking jsdom's representation of layout
	// jsdom changes may break these!
	const ScrollTest = ({ pages, bar, tabs }) => {
		const barRef = useRef(null);
		const tabRefs = useRef({});
		useEffect(() => {
			Object.defineProperty(barRef.current, "offsetWidth", {
				value: bar || 0,
				writable: true,
			});
			Object.defineProperty(barRef.current, "scrollLeft", {
				value: 0,
				writable: true,
			});
			if (tabs) {
				pages.forEach(({ href }, idx) => {
					Object.defineProperty(tabRefs.current[href], "offsetWidth", {
						value: tabs[idx] || 0,
					});
				});
			}
		}, [pages, bar, tabs]);
		const { barWidth, tabEdges, lastShownTab, getTabRef, getBarRef } = useTabScroll(
			pages,
			true, // Debug flag
			{ barRef, tabRefs },
		);
		return (
			<div id="outerElement">
				<InnerBar ref={getBarRef} data-width={barWidth}>
					{pages.map(({ href }, idx) => (
						<PageTab
							key={href}
							ref={getTabRef}
							data-href={href}
							data-edge={tabEdges[idx]}
						/>
					))}
				</InnerBar>
				Last shown tab: {lastShownTab}
			</div>
		);
	};

	let setupTest, root;
	beforeEach(() => {
		root = document.createElement("div");
		document.body.append(root);
		setupTest = (pages, widths) => {
			ReactDOM.render(
				<MemoryRouter>
					<ScrollTest pages={pages} {...widths} />
				</MemoryRouter>,
				root,
			);
			const element = root.querySelector("div#outerElement");
			const barElement = element.querySelector(getStyledClassSelector(InnerBar));
			const tabElements = barElement.querySelectorAll(getStyledClassSelector(PageTab));
			const setBarWidth = (width = 0) => {
				act(() => {
					barElement.offsetWidth = width;
					window.dispatchEvent(new Event("resize"));
				});
			};
			return { element, barElement, tabElements, setBarWidth };
		};
	});
	afterEach(() => {
		ReactDOM.unmountComponentAtNode(root);
		document.body.removeChild(root);
	});

	describe("test functions", () => {
		it("renders a bar with tabs", () => {
			const { element } = setupTest([{ href: "foo" }, { href: "bar" }]);
			expect(
				element,
				"to contain",
				<InnerBar>
					<PageTab data-href="foo" />
					<PageTab data-href="bar" />
				</InnerBar>,
			).and("to have text", "Last shown tab: 2");
		});

		it("can set widths", () => {
			const { barElement, tabElements } = setupTest(
				[{ href: "foo" }, { href: "bar" }, { href: "bell" }, { href: "lerp" }],
				{
					bar: 100,
					tabs: [20, 25],
				},
			);
			return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
				expect(barElement, "to have property", "offsetWidth", 100);
				expect(tabElements[0], "to have property", "offsetWidth", 20);
				expect(tabElements[1], "to have property", "offsetWidth", 25);
				expect(tabElements[2], "to have property", "offsetWidth", 0);
				expect(tabElements[3], "to have property", "offsetWidth", 0);
			});
		});

		it("can reset bar width", () => {
			const { barElement, setBarWidth } = setupTest(
				[{ href: "foo" }, { href: "bar" }, { href: "bell" }, { href: "lerp" }],
				{
					bar: 100,
					tabs: [50, 50, 50, 50],
				},
			);
			return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
				expect(barElement, "to have property", "offsetWidth", 100);
				setBarWidth(170);
				expect(barElement, "to have property", "offsetWidth", 170);
			});
		});

		it("fires resize event if bar size reset", () => {
			const { setBarWidth } = setupTest(
				[{ href: "foo" }, { href: "bar" }, { href: "bell" }, { href: "lerp" }],
				{
					bar: 100,
					tabs: [50, 50, 50, 50],
				},
			);
			const handler = sinon.spy().named("resizeHandler");
			window.addEventListener("resize", handler);
			return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
				try {
					setBarWidth(170);
					expect(handler, "was called once");
				} finally {
					window.removeEventListener("resize", handler);
				}
			});
		});
	});

	it("sets its width state", () => {
		const { element } = setupTest(
			[
				{ href: "foo" },
				{ href: "bar" },
				{ href: "bell" },
				{ href: "lerp", active: true },
			],
			{
				bar: 200,
				tabs: [75, 52, 65, 35],
			},
		);
		expect(
			element,
			"to contain",
			<InnerBar data-width="200">
				<PageTab data-href="foo" data-edge={75} />
				<PageTab data-href="bar" data-edge={75 + 52} />
				<PageTab data-href="bell" data-edge={75 + 52 + 65} />
				<PageTab data-href="lerp" data-edge={75 + 52 + 65 + 35} />
			</InnerBar>,
		);
	});

	it("scrolls one tab past the active element if possible", () => {
		const { barElement } = setupTest(
			[
				{ href: "foo" },
				{ href: "bar" },
				{ href: "bell", active: true },
				{ href: "lerp" },
			],
			{
				bar: 150,
				tabs: [75, 52, 65, 35],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(barElement.scrollLeft, "to equal", 75 + 52 + 65 + 35 - 150 + 7);
		});
	});

	it("scrolls to the active element if it is last", () => {
		const { barElement } = setupTest(
			[
				{ href: "foo" },
				{ href: "bar" },
				{ href: "bell" },
				{ href: "lerp", active: true },
			],
			{
				bar: 150,
				tabs: [75, 52, 65, 35],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(barElement.scrollLeft, "to equal", 75 + 52 + 65 + 35 - 150 + 7);
		});
	});

	it("sets last shown tab if bar wide enough to hold all", () => {
		const { element } = setupTest(
			[
				{ href: "foo" },
				{ href: "bar", active: true },
				{ href: "bell" },
				{ href: "lerp" },
				{ href: "meep" },
			],
			{
				bar: 300,
				tabs: [50, 50, 50, 50, 50],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(element, "to have text", "Last shown tab: 5");
		});
	});

	it("sets last shown tab according to how many will fit on screen", () => {
		const { element } = setupTest(
			[
				{ href: "foo", active: true },
				{ href: "bar" },
				{ href: "bell" },
				{ href: "lerp" },
				{ href: "meep" },
			],
			{
				bar: 400,
				tabs: [120, 120, 120, 120, 120],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(element, "to have text", "Last shown tab: 2");
		});
	});

	it("sets last shown tab to make sure active tab + next tab are shown", () => {
		const { element } = setupTest(
			[
				{ href: "foo" },
				{ href: "bar" },
				{ href: "bell", active: true },
				{ href: "lerp" },
				{ href: "meep" },
			],
			{
				bar: 300,
				tabs: [120, 120, 120, 120, 120],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(element, "to have text", "Last shown tab: 3");
		});
	});

	it("changes last shown tab if bar is resized", () => {
		const { element, setBarWidth } = setupTest(
			[
				{ href: "foo", active: true },
				{ href: "bar" },
				{ href: "bell" },
				{ href: "lerp" },
				{ href: "meep" },
			],
			{
				bar: 400,
				tabs: [120, 120, 120, 120, 120],
			},
		);
		return new Promise(resolve => setTimeout(resolve, 10)).then(() => {
			expect(element, "to have text", "Last shown tab: 2");
			setBarWidth(500);
			expect(element, "to have text", "Last shown tab: 3");
		});
	});
});
