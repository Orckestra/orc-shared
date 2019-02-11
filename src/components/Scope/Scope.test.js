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
				currentScope={{ name: "ScopeName" }}
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
				<ScopeBar
					name="ScopeName"
					show={true}
					updateViewState={updateViewState}
				/>
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
			<Scope currentScope={{ name: "ScopeName" }}>
				<div id="child" />
			</Scope>,
			"to render as",
			<React.Fragment>
				<ScopeBar name="ScopeName" />
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
				suportedLocales: [],
			},
			navigation: {
				route: { location: {}, match: { params: { scope: "ScopeName" } } },
			},
			view: { scopeSelector: { filter: "Foo" } },
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
				<MemoryRouter initialEntries={["/ScopeName/foo"]} initialIndex={0}>
					<I18n>
						<FullScope
							currentScope={{ name: "ScopeName" }}
							getScope={() => ({})}
							filterPlaceholder={{
								id: "test.filter",
								defaultMessage: "Filter",
							}}
						/>
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
				currentScope={{ name: "ScopeName" }}
				getScope={expect.it("to be a function")}
				updateViewState={expect.it("to be a function")}
				reset={expect.it("to be a function")}
				updateNodeState={expect.it("to be a function")}
				updateFilter={expect.it("to be a function")}
				filterPlaceholder={{ id: "test.filter", defaultMessage: "Filter" }}
				viewState={{ filter: "Foo" }}
			/>,
		);
	});
});
