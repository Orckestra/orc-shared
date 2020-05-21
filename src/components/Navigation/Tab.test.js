import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Router, MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import { createMemoryHistory } from "history";
import { Ignore } from "unexpected-reaction";
import { getClassSelector, getStyledClassSelector } from "../../utils/testUtils";
import Tab, { PageTab, ModuleTab, TabLink, ModuleIcon, TabText, CloseIcon } from "./Tab";
import { Placeholder } from "../Text";

describe("Tab", () => {
	let history, close;
	beforeEach(() => {
		history = createMemoryHistory();
		close = sinon.spy().named("close");
	});

	it("renders a module tab with icon and label", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab module icon="test" label="A module" href="/Foo/modu" />
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: getClassSelector(
					<MemoryRouter>
						<TabLink to="/" />
					</MemoryRouter>,
				),
			},
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<ModuleTab>
						<TabLink to="/Foo/modu">
							<ModuleIcon id="test" />
							<TabText>A module</TabText>
						</TabLink>
					</ModuleTab>
				</IntlProvider>
			</Router>,
		));

	it("renders an active module tab", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							module
							active
							icon="test"
							label={{ id: "test.module", defaultMessage: "A module" }}
							href="/Foo/modu"
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<ModuleTab active>
						<TabLink to="/Foo/modu">
							<ModuleIcon id="test" />
							<TabText>A module</TabText>
						</TabLink>
					</ModuleTab>
				</IntlProvider>
			</Router>,
		));

	it("renders an active module tab with a very long label", () => {
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
						<Tab
							module
							mustTruncate={true}
							active
							icon="test"
							label={{ id: "test.module", defaultMessage: "A very long label" }}
							href="/Foo/modu"
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			root,
		);

		const tab = root.querySelector("*"); // Get the first child
		const tabLinkElement = tab.querySelector(getStyledClassSelector(TabLink));
		const tabTextElement = tabLinkElement.querySelector(getStyledClassSelector(TabText));

		act(() => {
			// XXX: This is a nasty hack of jsdom, and may break unexpectedly
			Object.defineProperty(tabTextElement, "offsetWidth", {
				value: 10,
				writable: true,
			});
			Object.defineProperty(tabTextElement, "scrollWidth", {
				value: 20,
				writable: true,
			});
			window.dispatchEvent(new Event("resize"));
		});

		try {
			act(() => {});
			expect(
				tab,
				"to satisfy",
				<Router history={history}>
					<IntlProvider locale="en">
						<ModuleTab active>
							<TabLink to="/Foo/modu" mustTruncate={true}>
								<ModuleIcon id="test" />
								<TabText title="A very long label">A very long label</TabText>
							</TabLink>
						</ModuleTab>
					</IntlProvider>
				</Router>,
			);
		} finally {
			ReactDOM.unmountComponentAtNode(root);
			document.body.removeChild(root);
		}
	});

	it("renders with a message error", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							module
							active
							icon="test"
							label={{ id: "test.module", defaultMessage: "A module {missingValue}" }}
							href="/Foo/modu"
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<ModuleTab active>
						<TabLink to="/Foo/modu">
							<ModuleIcon id="test" />
							<TabText>
								<Placeholder />
							</TabText>
						</TabLink>
					</ModuleTab>
				</IntlProvider>
			</Router>,
		));

	it("close a tab when scope is not supported", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							label={{ id: "test.page", defaultMessage: "A page" }}
							href="/Foo/modu"
							close={close}
							scopeNotSupported
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<PageTab hide>
						<TabLink to="/Foo/modu">
							<TabText>A page</TabText>
							<CloseIcon onClick={close} />
						</TabLink>
					</PageTab>
				</IntlProvider>
			</Router>,
		).then(() => expect(close, "was called")));

	it("renders a tab outside the current scope", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							module
							outsideScope
							icon="test"
							label={{ id: "test.module", defaultMessage: "A module" }}
							href="/Foo/modu"
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: getClassSelector(
					<MemoryRouter>
						<TabLink to="/" />
					</MemoryRouter>,
				),
			},
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<ModuleTab outsideScope>
						<TabLink outsideScope to="/Foo/modu">
							<ModuleIcon id="test" />
							<TabText>A module</TabText>
						</TabLink>
					</ModuleTab>
				</IntlProvider>
			</Router>,
		));

	it("renders a page tab with label and close button", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							label={{ id: "test.page", defaultMessage: "A page" }}
							href="/Foo/modu/page"
							close={close}
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<PageTab>
						<TabLink to="/Foo/modu/page">
							<TabText>A page</TabText>
							<CloseIcon onClick={close} />
						</TabLink>
					</PageTab>
				</IntlProvider>
			</Router>,
		));

	it("renders an active page tab", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab active href="/Foo/modu/page" />
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: getClassSelector(<CloseIcon />),
			},
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<PageTab active>
						<TabLink to="/Foo/modu/page">
							<TabText>
								<Ignore />
							</TabText>
							<CloseIcon onClick={expect.it("to be a function")} />
						</TabLink>
					</PageTab>
				</IntlProvider>
			</Router>,
		));

	it("curries close handler with tab and mapped href", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab
							label="A page"
							href="/Foo/modu/page/sub"
							mappedFrom="/Foo/modu/page"
							close={close}
						/>
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"with event",
			{
				type: "click",
				target: getClassSelector(<CloseIcon />),
			},
		).then(() => expect(close, "was called")));
});

describe("TabText", () => {
	let history;
	beforeEach(() => {
		history = createMemoryHistory();
	});

	it("sets css for TabLink without attributes", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<TabLink to="/" />
				</Router>
			</Provider>,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "cursor: not-allowed;")
				.and("not to contain", "max-width: 220px;"),
		));

	it("sets css for TabLink with attributes", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<TabLink to="/" outsideScope={true} mustTruncate={true} />
				</Router>
			</Provider>,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"cursor: not-allowed;",
			"max-width: 220px;",
		));
});
