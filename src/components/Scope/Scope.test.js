import React from "react";
import ReactDOM from "react-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import I18n from "../I18n";
import FullScope, { Scope, ScopeBar, Bar, AlignedButton } from "./index";
import Selector from "./Selector";

describe("Scope", () => {
	let reset,
		updateViewState,
		updateNodeState,
		updateFilter,
		mockEvent,
		getScope,
		nodeState;
	beforeEach(() => {
		reset = sinon.spy().named("reset");
		updateViewState = sinon.spy().named("updateViewState");
		updateNodeState = sinon.spy().named("updateNodeState");
		updateFilter = sinon.spy().named("updateFilter");
		mockEvent = { stopPropagation: sinon.spy().named("event.stopPropagation") };
		getScope = () => {};
		nodeState = { foo: true, bar: false };
	});

	it("renders a scope bar and selector panel, and viewport", () =>
		expect(
			<Scope
				currentScope={{ name: "Test 1" }}
				getScope={getScope}
				reset={reset}
				updateViewState={updateViewState}
				updateNodeState={updateNodeState}
				updateFilter={updateFilter}
				viewState={{
					nodeState: nodeState,
					show: true,
					filter: "",
				}}
				filterPlaceholder={{ defaultMessage: "Type a scope name" }}
			>
				<div id="child" />
			</Scope>,
			"to render as",
			<React.Fragment>
				<ScopeBar name="Test 1" show={true} updateViewState={updateViewState} />
				<Selector
					show={true}
					reset={expect
						.it("to be a function")
						.and("when called with", [mockEvent])}
					getScope={getScope}
					nodeState={nodeState}
					updateNodeState={updateNodeState}
					filter=""
					updateFilter={updateFilter}
					filterPlaceholder={{ defaultMessage: "Type a scope name" }}
				/>
				<div id="child" />
			</React.Fragment>,
		));

	it("defaults to not showing the selector", () =>
		expect(
			<Scope currentScope={{ name: "Test 1" }}>
				<div id="child" />
			</Scope>,
			"to render as",
			<React.Fragment>
				<ScopeBar name="Test 1" />
				<Selector show={false} />
				<div id="child" />
			</React.Fragment>,
		));
});

describe("ScopeBar", () => {
	let updateViewState;
	beforeEach(() => {
		updateViewState = sinon.spy().named("updateViewState");
	});

	it("renders the button to show the scope dialog", () =>
		expect(
			<ScopeBar name="Scope name" updateViewState={updateViewState} />,
			"to render as",
			<Bar>
				<AlignedButton
					onClick={expect
						.it("to be a function")
						.and("when called", "to be undefined")}
				>
					Scope name
				</AlignedButton>
			</Bar>,
		).then(() =>
			Promise.all([
				expect(updateViewState, "to have calls satisfying", [
					{ args: ["show", true] },
				]),
			]),
		));
});

describe("Fully connected Scope", () => {
	let store, state, appRoot, modalRoot;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "en",
				suportedLocales: ["en"],
			},
			navigation: {
				route: { location: {}, match: { params: { scope: "test1" } } },
			},
			view: { scopeSelector: { filter: "Foo" } },
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
		const render = ReactDOM.render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/test1/foo"]} initialIndex={0}>
					<I18n>
						<FullScope />
					</I18n>
				</MemoryRouter>
			</Provider>,
			appRoot,
		);
		return expect(
			render,
			"to contain",
			<Scope
				name="scopeSelector"
				currentScope={{ name: "Test 1" }}
				getScope={expect.it("to be a function")}
				updateViewState={expect.it("to be a function")}
				reset={expect.it("to be a function")}
				updateFilter={expect.it("to be a function")}
				viewState={{ filter: "Foo" }}
			/>,
		);
	});
});
