import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { getClassName, PropStruct } from "../../utils/testUtils";
import I18n from "../I18n";
import { setupScope, Scope, ScopeBar, Bar, AlignedButton } from "./index";
import { Wrapper as SelectorWrapper, InputBox, SearchInput } from "./Selector";
import { Wrapper as BranchWrapper } from "../Treeview/Branch";

describe("Scope", () => {
	let state,
		store,
		reset,
		updateNodeState,
		updateFilter,
		getScope,
		nodeState,
		modalRoot;
	beforeEach(() => {
		reset = sinon.spy().named("reset");
		updateNodeState = sinon.spy().named("updateNodeState");
		updateFilter = sinon.spy().named("updateFilter");
		getScope = () => {};
		nodeState = { foo: true, bar: false };
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		state = Immutable.fromJS({
			view: {
				testScope: {
					nodeState: nodeState,
					show: true,
					filter: "",
				},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => state,
		};
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		document.body.removeChild(modalRoot);
	});

	it("renders a scope bar and selector panel, and viewport", () =>
		expect(
			<div>
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter>
							<Scope
								name="testScope"
								currentScope={{ name: "Test 1" }}
								getScope={getScope}
								reset={reset}
								updateNodeState={updateNodeState}
								updateFilter={updateFilter}
								defaultNodeState={{ bar: true, feep: true }}
								filterPlaceholder={{
									defaultMessage: "Type a scope name",
									id: "test.placeholder",
								}}
							>
								<div id="child" />
							</Scope>
						</MemoryRouter>
					</IntlProvider>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<Bar>
					<AlignedButton active>Test 1</AlignedButton>
				</Bar>
				<div id="child" />
			</div>,
		).then(() =>
			expect(
				modalRoot,
				"to satisfy",
				<div>
					<div>
						<SelectorWrapper>
							<InputBox>
								<IntlProvider locale="en">
									<SearchInput />
								</IntlProvider>
							</InputBox>
							<BranchWrapper />
						</SelectorWrapper>
					</div>
				</div>,
			),
		));

	it("defaults to not showing the selector", () =>
		expect(
			<div>
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter>
							<Scope currentScope={{ name: "Test 1" }}>
								<div id="child" />
							</Scope>
						</MemoryRouter>
					</IntlProvider>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<Bar>
					<AlignedButton>Test 1</AlignedButton>
				</Bar>
				<div id="child" />
			</div>,
		).then(() => expect(modalRoot, "to satisfy", <div></div>)));
});

describe("ScopeBar", () => {
	let updateViewState;
	beforeEach(() => {
		updateViewState = sinon.spy().named("updateViewState");
	});

	it("renders the button to show the scope dialog", () =>
		expect(
			<ScopeBar name="Scope name" updateViewState={updateViewState} />,
			"when mounted",
			"with event",
			{ type: "click", target: "." + getClassName(<AlignedButton />) },
			"to satisfy",
			<Bar>
				<AlignedButton id="showScopeSelector">Scope name</AlignedButton>
			</Bar>,
		).then(() =>
			Promise.all([
				expect(updateViewState, "to have calls satisfying", [
					{ args: ["show", true] },
				]),
			]),
		));
});

describe("setupScope", () => {
	let store, state, appRoot, modalRoot;
	const TestComp = setupScope(PropStruct);

	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				suportedLocales: ["en"],
			},
			navigation: {
				route: { location: {}, match: { params: { scope: "test1" } } },
			},
			view: { scopeSelector: { filter: "Foo", show: true } },
			scopes: {
				test1: {
					id: "test1",
					name: { "en-CA": "Test 1" },
					foo: false,
					bar: false,
				},
				test2: {
					id: "test2",
					name: { "en-US": "Test 2" },
					foo: false,
					bar: true,
				},
				test3: {
					id: "test3",
					name: { "en-CA": "Test 3" },
					foo: true,
					bar: false,
				},
				test4: {
					id: "test4",
					name: { "en-US": "Test 4" },
					foo: true,
					bar: true,
				},
			},
		});
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => state,
		};
		appRoot = document.createElement("div");
		appRoot.id = "app";
		document.body.appendChild(appRoot);
		modalRoot = document.createElement("div");
		modalRoot.id = "modal";
		document.body.appendChild(modalRoot);
	});
	afterEach(() => {
		try {
			ReactDOM.unmountComponentAtNode(appRoot);
		} catch (_) {}
		document.body.removeChild(appRoot);
		document.body.removeChild(modalRoot);
	});

	it("renders a Scope with the right properties", () => {
		ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/test1/foo"]} initialIndex={0}>
					<I18n>
						<TestComp />
					</I18n>
				</MemoryRouter>
			</Provider>,
			appRoot,
		);
		return expect(
			appRoot,
			"to satisfy",
			<div>
				<PropStruct
					name="scopeSelector"
					currentScope={{
						id: "test1",
						name: "Test 1",
						foo: false,
						bar: false,
					}}
					getScope={() => {}}
					loadScopes={() => {}}
					defaultNodeState={{}}
					reset={() => {}}
					updateFilter={() => {}}
					match="__ignore"
					location="__ignore"
					history="__ignore"
				/>
			</div>,
		);
	});
});
