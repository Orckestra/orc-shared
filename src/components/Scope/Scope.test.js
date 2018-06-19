import React from "react";
import sinon from "sinon";
import { Scope, ScopeBar, Bar, AlignedButton } from "./index";
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
				show={true}
				reset={reset}
				nodeState={nodeState}
				filter=""
				updateViewState={updateViewState}
				updateNodeState={updateNodeState}
				updateFilter={updateFilter}
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
