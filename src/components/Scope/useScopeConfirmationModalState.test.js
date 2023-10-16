import React from "react";
import Immutable from "immutable";
import sinon from "sinon";
import { TestWrapper } from "../../utils/testUtils";
import useScopeConfirmationModalState from "./useScopeConfirmationModalState";
import { mount } from "enzyme";
import { APPLICATION_SCOPE_HAS_CHANGED } from "../../actions/scopes";

jest.mock("../../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = () => "URL";
	return modExport;
});

const TestComp = () => {
	const [isModalOpened, closeModalCallback, scopeDialogType, acceptScopeChange, selectNewScope] =
		useScopeConfirmationModalState();
	return (
		<div>
			<div id="isModalOpened">{isModalOpened ? "true" : "false"}</div>
			<div id="scopeDialogType">{scopeDialogType}</div>
			<div id="closeModalCallback" onClick={closeModalCallback}>
				closeModalCallback
			</div>
			<div id="acceptScopeChange" onClick={acceptScopeChange}>
				acceptScopeChange
			</div>
			<div id="selectNewScope" onClick={() => selectNewScope("newScope")}>
				selectNewScope
			</div>
		</div>
	);
};

describe("useScopeConfirmationModalState", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({
			input: {},
			locale: {
				locale: "en-CA",
				supportedLocales: ["en-US", "en-CA"],
			},
			navigation: {
				route: { match: { path: "/:scope/TheModuleName", params: { scope: "TheOldScope" } } },
				moduleTabs: {},
				config: { prependPath: "/:scope/", prependHref: "/Scope1/" },
			},
			view: {},
			requests: {
				logout: false,
			},
			scopes: {
				TheOldScope: {
					id: "TheOldScope",
					name: { "en-CA": "TheOldScope" },
					foo: false,
					bar: false,
				},
			},
			settings: {
				defaultScope: "ds",
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
	});

	function openTabs() {
		state = state.setIn(["navigation", "moduleTabs"], Immutable.fromJS({ locations: ["locations/id"] }));
	}

	it("modal dialog is closed by default", function () {
		expect(
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }}>
				<div>
					<div id="isModalOpened">false</div>
					<div id="scopeDialogType">None</div>
					<div id="closeModalCallback">closeModalCallback</div>
					<div id="acceptScopeChange">acceptScopeChange</div>
					<div id="selectNewScope">selectNewScope</div>
				</div>
			</TestWrapper>,
		);
	});

	it("dialog type is ScopeChangeConfirmation because of opened tabs", function () {
		openTabs();

		expect(
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }}>
				<div>
					<div id="isModalOpened">false</div>
					<div id="scopeDialogType">ScopeChangeConfirmation</div>
					<div id="closeModalCallback">closeModalCallback</div>
					<div id="acceptScopeChange">acceptScopeChange</div>
					<div id="selectNewScope">selectNewScope</div>
				</div>
			</TestWrapper>,
		);
	});

	it("dialog type is HasUnsavedDataMessage because of opened tabs", function () {
		openTabs();
		state = state.setIn(
			["view", "edit", "module1", "id1", "section1", "model", "field1"],
			Immutable.fromJS({
				value: "smth",
				error: "smth",
				wasModified: true,
			}),
		);

		expect(
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>,
			"when mounted",
			"to satisfy",
			<TestWrapper provider={{ store }}>
				<div>
					<div id="isModalOpened">false</div>
					<div id="scopeDialogType">HasUnsavedDataMessage</div>
					<div id="closeModalCallback">closeModalCallback</div>
					<div id="acceptScopeChange">acceptScopeChange</div>
					<div id="selectNewScope">selectNewScope</div>
				</div>
			</TestWrapper>,
		);
	});

	it("selecting a new scope with active tabs opens the dialog", function () {
		openTabs();

		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectScopeBtn = mountedComponent.find("#selectNewScope");

		selectScopeBtn.simulate("click");

		const isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "true");
	});

	it("selecting a new scope without active tabs changes the scope", async () => {
		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectScopeBtn = mountedComponent.find("#selectNewScope");

		selectScopeBtn.simulate("click");

		await new Promise(resolve => setTimeout(resolve, 10));

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: APPLICATION_SCOPE_HAS_CHANGED,
						payload: {
							previousScope: "TheOldScope",
							newScope: "newScope",
							moduleName: "TheModuleName",
						},
					},
				],
			},
		]);
	});

	it("closeModalCallback closes the dialog", function () {
		openTabs();

		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectScopeBtn = mountedComponent.find("#selectNewScope");
		selectScopeBtn.simulate("click");

		let isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "true");

		const closeModalBtn = mountedComponent.find("#closeModalCallback");
		closeModalBtn.simulate("click");

		isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "false");
	});

	it("acceptScopeChange changes the scope", async () => {
		openTabs();

		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectScopeBtn = mountedComponent.find("#selectNewScope");
		selectScopeBtn.simulate("click");

		let isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "true");

		const acceptScopeChangeBtn = mountedComponent.find("#acceptScopeChange");
		acceptScopeChangeBtn.simulate("click");

		await new Promise(resolve => setTimeout(resolve, 10));

		isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "false");

		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: APPLICATION_SCOPE_HAS_CHANGED,
						payload: {
							previousScope: "TheOldScope",
							newScope: "newScope",
							moduleName: "TheModuleName",
						},
					},
				],
			},
		]);
	});

	it("acceptScopeChange invokes close tab handlers", async () => {
		const closingTabHandler = sinon.spy(() => Promise.resolve("tab_closed")).named("closingTabHandler");

		state = state.setIn(
			["navigation", "closingTabsHandlerActions"],
			Immutable.fromJS({
				TheModuleName: [
					{ entityId: "id1", closeTab: closingTabHandler },
					{ entityId: "id2", closeTab: closingTabHandler },
					{ entityId: "id3", closeTab: closingTabHandler },
				],
			}),
		);

		openTabs();

		const component = (
			<TestWrapper provider={{ store }}>
				<TestComp />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectScopeBtn = mountedComponent.find("#selectNewScope");
		selectScopeBtn.simulate("click");

		let isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "true");

		const acceptScopeChangeBtn = mountedComponent.find("#acceptScopeChange");
		acceptScopeChangeBtn.simulate("click");

		await new Promise(resolve => setTimeout(resolve, 10));

		isModalOpened = mountedComponent.find("#isModalOpened").text();
		expect(isModalOpened, "to equal", "false");

		expect(closingTabHandler.callCount, "to be", 3);
		expect(closingTabHandler, "to have calls satisfying", [
			{ args: [null, true] },
			{ args: [null, true] },
			{ args: [null, true] },
		]);

		expect(store.dispatch.callCount, "to be", 1);
		expect(store.dispatch, "to have calls satisfying", [
			{
				args: [
					{
						type: APPLICATION_SCOPE_HAS_CHANGED,
						payload: {
							previousScope: "TheOldScope",
							newScope: "newScope",
							moduleName: "TheModuleName",
						},
					},
				],
			},
		]);
	});
});
