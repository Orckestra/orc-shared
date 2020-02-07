import React from "react";
import { Provider } from "rreact-redux";
import { Router, MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
import { createMemoryHistory } from "history";
import { Ignore } from "unexpected-reaction";
import { getClassName } from "../../utils/testUtils";
import FullTab, {
	Tab,
	PageTab,
	ModuleTab,
	TabLink,
	ModuleIcon,
	TabText,
	CloseIcon,
} from "./Tab";

describe("Tab", () => {
	let history;
	beforeEach(() => {
		history = createMemoryHistory();
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
				target:
					"." +
					getClassName(
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
				target:
					"." +
					getClassName(
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

	it("renders a page tab with label and close button", () => {
		const close = () => {};
		return expect(
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
		);
	});

	it("renders an active page tab", () => {
		const close = () => {};
		return expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<Router history={history}>
					<IntlProvider locale="en">
						<Tab active href="/Foo/modu/page" close={close} />
					</IntlProvider>
				</Router>
			</Provider>,
			"when mounted",
			"to satisfy",
			<Router history={history}>
				<IntlProvider locale="en">
					<PageTab active>
						<TabLink to="/Foo/modu/page">
							<TabText>
								<Ignore />
							</TabText>
							<CloseIcon onClick={close} />
						</TabLink>
					</PageTab>
				</IntlProvider>
			</Router>,
		);
	});

	describe("with close handler", () => {
		it("curries close handler with tab and mapped href", () => {
			const innerClose = sinon.spy().named("innerClose");
			const close = sinon.spy(() => innerClose).named("close");
			return expect(
				<Provider
					store={{
						subscribe: () => {},
						dispatch: () => {},
						getState: () => ({}),
					}}
				>
					<Router history={history}>
						<IntlProvider locale="en">
							<FullTab
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
					target: "." + getClassName(<CloseIcon />),
				},
			)
				.then(() =>
					expect(close, "to have calls satisfying", [
						{ args: ["/Foo/modu/page/sub", "/Foo/modu/page"] },
					]),
				)
				.then(() => expect(innerClose, "was called"));
		});
	});
});
