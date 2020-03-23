import React, { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { mount, act } from "unexpected-reaction";
import sinon from "sinon";
import { getStyledClassSelector, getElmClasses } from "../../utils/testUtils";
import Tab, { PageTab } from "./Tab";
import Bar, { TabBar, ScrollableBar, InnerBar, useTabScroll } from "./Bar";

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
					</TabBar>
				</MemoryRouter>
			</Provider>,
		));

	it("hides tabs when scrollable bar is too narrow to show them all", () => {
		const bar = mount(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MemoryRouter>
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
				</MemoryRouter>
			</Provider>,
		);
		const barElement = bar.querySelector(getStyledClassSelector(<InnerBar />));
		const tabElements = barElement.querySelectorAll(getStyledClassSelector(<PageTab />));
		act(() => {
			Object.defineProperty(barElement, "offsetWidth", {
				value: 300,
				writable: true,
			});
			tabElements.forEach(tab => {
				Object.defineProperty(tab, "offsetWidth", {
					value: 130,
				});
			});
			barElement.dispatchEvent(new Event("resize"));
		});
		// Expect dropdown to be present
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
					</TabBar>
				</MemoryRouter>
			</Provider>,
		);
	});
});

describe("useTabScroll", () => {
	// BE ADVISED!
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
			barRef.current.scrollTo.callsFake(({ left }) => (barRef.current.scrollLeft = left));
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
			<div>
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

	let setupTest;
	beforeEach(() => {
		setupTest = (pages, widths) => {
			const element = mount(<ScrollTest pages={pages} {...widths} />);
			const barElement = element.querySelector(getStyledClassSelector(<InnerBar />));
			const tabElements = barElement.querySelectorAll(
				getStyledClassSelector(<PageTab />),
			);
			const setBarWidth = (width = 0) => {
				act(() => {
					barElement.offsetWidth = width;
					barElement.dispatchEvent(new Event("resize"));
				});
			};
			return { element, barElement, tabElements, setBarWidth };
		};
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
			expect(barElement, "to have property", "offsetWidth", 100);
			expect(tabElements[0], "to have property", "offsetWidth", 20);
			expect(tabElements[1], "to have property", "offsetWidth", 25);
			expect(tabElements[2], "to have property", "offsetWidth", 0);
			expect(tabElements[3], "to have property", "offsetWidth", 0);
		});

		it("can reset bar width", () => {
			const { barElement, setBarWidth } = setupTest(
				[{ href: "foo" }, { href: "bar" }, { href: "bell" }, { href: "lerp" }],
				{
					bar: 100,
					tabs: [50, 50, 50, 50],
				},
			);
			expect(barElement, "to have property", "offsetWidth", 100);
			setBarWidth(170);
			expect(barElement, "to have property", "offsetWidth", 170);
		});

		it("fires resize event if bar size reset", () => {
			const { barElement, setBarWidth } = setupTest(
				[{ href: "foo" }, { href: "bar" }, { href: "bell" }, { href: "lerp" }],
				{
					bar: 100,
					tabs: [50, 50, 50, 50],
				},
			);
			const handler = sinon.spy().named("resizeHandler");
			barElement.addEventListener("resize", handler);
			setBarWidth(170);
			expect(handler, "was called once");
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
		expect(barElement.scrollLeft, "to equal", 75 + 52 + 65 + 35 - 150 + 5);
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
		expect(barElement.scrollLeft, "to equal", 75 + 52 + 65 + 35 - 150 + 5);
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
		expect(element, "to have text", "Last shown tab: 5");
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
		expect(element, "to have text", "Last shown tab: 2");
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
		expect(element, "to have text", "Last shown tab: 3");
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
		expect(element, "to have text", "Last shown tab: 2");
		setBarWidth(500);
		expect(element, "to have text", "Last shown tab: 3");
	});
});
