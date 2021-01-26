import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { simulate } from "unexpected-reaction";
import { PropStruct } from "../../utils/testUtils";
import { VIEW_SET_FIELD } from "../../actions/view";
import I18n from "../I18n";
import RoutedScope, { Scope, ScopeBar } from "./index";
import { createMuiTheme, TestWrapper } from "./../../utils/testUtils";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import Button from "@material-ui/core/Button";
import { extractMessages } from "./../../utils/testUtils";
import sharedMessages from "./../../sharedMessages";
import ScopeSelector from "./../MaterialUI/ScopeSelector/ScopeSelector";

const messages = extractMessages(sharedMessages);

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

let state, store;
let appRoot, modalRoot;
beforeEach(() => {
	state = Immutable.fromJS({
		locale: {
			locale: "en-US",
			suportedLocales: ["en-US"],
		},
		navigation: {
			route: { location: {}, match: { path: "/:scope/Bar", params: { scope: "test1" } } },
		},
		scopes: {
			test1: {
				id: "test1",
				name: { "en-CA": "Test 1" },
				foo: false,
				bar: false,
				scopePath: ["test1"]
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
				parentScopeId: "test1",
			},
			test4: {
				id: "test4",
				name: { "en-US": "Test 4" },
				foo: true,
				bar: true,
			},
			test5: {
				id: "test5",
				name: { "en-US": "Test 5" },
				foo: true,
				bar: true,
				parentScopeId: "test4",
			},
		},
		settings: {
			defaultScope: "aDefaultScope",
		},
		view: {
			scopeSelector: { filter: "Foo", show: true },
		},
	});
	const subs = [];
	store = {
		updateState: () => {
			subs.forEach((sub, i) => {
				sub();
			});
		},
		subscribe: sub => {
			subs.push(sub);
			return () => {};
		},
		getState: () => state,
		dispatch: sinon.spy().named("dispatch"),
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

const theme = createMuiTheme();

describe("ScopeBar", () => {
	let updateViewState;
	beforeEach(() => {
		updateViewState = sinon.spy().named("updateViewState");
	});

	it("renders the button to show the scope dialog when scope selector is closed", () => {
		const component = <ScopeBar show={false} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<div>
				<div>
					<Button variant="outlined" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("renders the disabled scope button ", () => {
		const component = <ScopeBar disabled={true} show={false} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<div>
				<div>
					<Button disabled variant="outlined" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("renders the button to show the scope dialog when scope selector is opened", () => {
		const component = <ScopeBar show={true} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<div>
				<div>
					<Button variant="contained" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calles passed updateViewState even on click", () => {
		const component = <ScopeBar show={false} name="Scope name" updateViewState={updateViewState} />;

		const mountedComponent = mount(component);

		const button = mountedComponent.find(Button);

		button.invoke("onClick")();

		expect(updateViewState, "to have a call satisfying", { args: ["show", true] });
	});
});

describe("Scope", () => {
	let nodeState;
	beforeEach(() => {
		nodeState = { foo: true, bar: false };
		state = state.setIn(["view", "scopeSelector", "nodeState"], Immutable.fromJS(nodeState));
	});

	it("renders a scope bar, selector panel with handlers, and viewport", () => {
		const scopes = [
			{
				id: "test",
				name: "test",
				children: [],
				type: "Global",
				scopePath: ["test"]
			}
		];
		const getScope = (_) => scopes[0];

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Scope>
					<div id="child" />
				</Scope>
			</TestWrapper>
		);

		const expectedScopeBar = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeBar show={true} name="Test 1" />
			</TestWrapper>
		);

		const expectedScopeSelector = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeSelector
					show={true}
					getScope={getScope}
					selectedScope={scopes[0].id}
					closeSelector={jest.fn()}
					filter="Foo"
					updateFilter={jest.fn()}
				/>
			</TestWrapper>
		);

		const expectedChild = <div id="child" />;

		expect(component, "when mounted", "to satisfy", [expectedScopeBar, expectedChild]).then(() =>
			expect(modalRoot, "to satisfy", expectedScopeSelector)
		);

		simulate(modalRoot, { type: "change", value: "text", target: "input" });

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: "VIEW_STATE_SET_FIELD",
						payload: { name: "scopeSelector", field: "filter", value: "text" },
					},
				],
			},
		]);
	});

	it("Updates show to false in view state when close selector is called", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<Scope>
					<div id="child" />
				</Scope>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const scopeSelector = mountedComponent.find(ScopeSelector);

		const stopPropagationSpy = sinon.spy();

		const event = {
			stopPropagation: stopPropagationSpy
		};

		scopeSelector.prop("closeSelector")(event);

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: "VIEW_STATE_SET_FIELD",
						payload: { name: "scopeSelector", field: "show", value: false },
					},
				],
			},
		]);

		expect(stopPropagationSpy, "was called");
	});

	it("resets the scope tree state when closing, to ensure current scope is visible", () => {
		state = state.withMutations(s => {
			s.setIn(["navigation", "route", "match", "params", "scope"], "test3");
			s.setIn(["view", "scopeSelector"], Immutable.fromJS({ show: false, nodeState: { test1: false, test4: true } }));
		});
		ReactDOM.render(
			<div>
				<TestWrapper provider={{ store }} memoryRouter={{ initialEntries: ["/test3/stuff"] }} intlProvider={{ messages }}>
					<Scope>
						<div id="child" />
					</Scope>
				</TestWrapper>
			</div>,
			appRoot,
		);
		state = state.setIn(["view", "scopeSelector", "show"], true);
		store.updateState();
		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: VIEW_SET_FIELD,
						payload: {
							name: "scopeSelector",
							field: "nodeState",
							value: { test1: true, test4: true },
						},
					},
				],
			},
		]);
		state = state.setIn(["view", "scopeSelector", "nodeState", "test4"], false);
		state = state.setIn(["view", "scopeSelector", "show"], false);
		store.updateState();
		state = state.setIn(["view", "scopeSelector", "show"], true);
		store.updateState();
		expect(store.dispatch, "to have calls satisfying", [
			{
				/* This call is checked above */
			},
			{
				args: [
					{
						type: VIEW_SET_FIELD,
						payload: {
							name: "scopeSelector",
							field: "nodeState",
							value: { test1: true, test4: false },
						},
					},
				],
			},
		]);
	});

	it("defaults to not showing the selector", () => {
		state = state.deleteIn(["view", "scopeSelector", "show"]);

		const component = (
			<TestWrapper provider={{ store }} memoryRouter intlProvider={{ messages }} stylesProvider muiThemeProvider={{ theme }}>
				<Scope>
					<div id="child" />
				</Scope>
			</TestWrapper>
		);

		const expectedScopeBar = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeBar show={false} name="Test 1" />
			</TestWrapper>
		);

		const expectedChild = <div id="child" />;

		expect(component, "when mounted", "to satisfy", [expectedScopeBar, expectedChild]).then(() =>
			expect(modalRoot, "to satisfy", <div></div>)
		);
	});
});

describe("RoutedScope", () => {
	const TestComp = props => {
		const { pathname } = useLocation();
		return <PropStruct pathname={pathname} {...props} />;
	};

	it("renders within a matched route", () => {
		ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/test1/foo"]} initialIndex={0}>
					<I18n>
						<RoutedScope>
							<TestComp itIs="me" />
						</RoutedScope>
					</I18n>
				</MemoryRouter>
			</Provider>,
			appRoot,
		);
		return expect(appRoot, "to contain", <PropStruct pathname="/test1/foo" itIs="me" />);
	});

	it("redirects to Global if route not matched", () => {
		state = state.setIn(["settings", "defaultScope"], null);
		ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[""]} initialIndex={0}>
					<I18n>
						<RoutedScope>
							<TestComp itIs="me" />
						</RoutedScope>
					</I18n>
				</MemoryRouter>
			</Provider>,
			appRoot,
		);
		return expect(appRoot, "to contain", <PropStruct pathname="/Global" itIs="me" />);
	});

	it("redirects to default scope if route not matched", () => {
		ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter initialEntries={[""]} initialIndex={0}>
					<I18n>
						<RoutedScope>
							<TestComp itIs="me" />
						</RoutedScope>
					</I18n>
				</MemoryRouter>
			</Provider>,
			appRoot,
		);
		return expect(appRoot, "to contain", <PropStruct pathname="/aDefaultScope" itIs="me" />);
	});
});
