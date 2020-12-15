import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { simulate } from "unexpected-reaction";
import { PropStruct } from "../../utils/testUtils";
import { VIEW_SET_FIELD } from "../../actions/view";
import I18n from "../I18n";
import RoutedScope, { Scope, ScopeBar, Bar } from "./index";
import { Wrapper as SelectorWrapper, InputBox, SearchInput } from "./Selector";
import { Wrapper as BranchWrapper } from "../Treeview/Branch";
import TooltippedTypography from "./../MaterialUI/DataDisplay/TooltippedElements/TooltippedTypography";
import Button from "@material-ui/core/Button";

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
			locale: "en",
			suportedLocales: ["en"],
		},
		navigation: {
			route: { location: {}, match: { params: { scope: "test1" } } },
		},
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

describe("ScopeBar", () => {
	let updateViewState;
	beforeEach(() => {
		updateViewState = sinon.spy().named("updateViewState");
	});

	it("renders the button to show the scope dialog when scope selector is closed", () => {
		const component = <ScopeBar show={false} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<Bar>
				<div>
					<Button variant="outlined" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</Bar>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("renders the disabled scope button ", () => {
		const component = <ScopeBar disabled={true} show={false} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<Bar>
				<div>
					<Button disabled variant="outlined" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</Bar>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("renders the button to show the scope dialog when scope selector is opened", () => {
		const component = <ScopeBar show={true} name="Scope name" updateViewState={updateViewState} />;

		const expected = (
			<Bar>
				<div>
					<Button variant="contained" color="primary" onClick={() => updateViewState("show", true)}>
						<TooltippedTypography noWrap children="Scope name" titleValue="Scope name" />
					</Button>
				</div>
			</Bar>
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
		ReactDOM.render(
			<div>
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter>
							<Scope
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
			appRoot,
		);
		expect(
			appRoot,
			"to satisfy",
			<div>
				<div>
					<ScopeBar show={true} name="Test 1" />
					<div id="child" />
				</div>
			</div>,
		);
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
		);
		simulate(modalRoot, { type: "change", value: "text", target: "input" });
		appRoot.click();
		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: "VIEW_STATE_SET_FIELD",
						payload: { name: "scopeSelector", field: "filter", value: "text" },
					},
				],
			},
			{
				args: [
					{
						type: VIEW_SET_FIELD,
						payload: { name: "scopeSelector", field: "show", value: false },
					},
				],
			},
		]);
	});

	it("resets the scope tree state when closing, to ensure current scope is visible", () => {
		state = state.withMutations(s => {
			s.setIn(["navigation", "route", "match", "params", "scope"], "test3");
			s.setIn(["view", "scopeSelector"], Immutable.fromJS({ show: false, nodeState: { test1: false, test4: true } }));
		});
		ReactDOM.render(
			<div>
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter initialEntries={["/test3/stuff"]}>
							<Scope
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
		return expect(
			<div>
				<Provider store={store}>
					<IntlProvider locale="en">
						<MemoryRouter>
							<Scope>
								<div id="child" />
							</Scope>
						</MemoryRouter>
					</IntlProvider>
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div>
				<ScopeBar show={false} name="Test 1" />
				<div id="child" />
			</div>,
		).then(() => expect(modalRoot, "to satisfy", <div></div>));
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
