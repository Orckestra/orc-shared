import React from "react";
import Immutable from "immutable";
import { scopeTypes } from "./../../../constants";
import sinon from "sinon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import { mount } from "enzyme";
import TreeItem from "./TreeItem";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItemMui from "@material-ui/lab/TreeItem";
import ScopeTreeView from "./ScopeTreeView";

describe("ScopeTreeView", () => {
	let store, state, onSelectedSpy;

	beforeEach(() => {
		state = Immutable.fromJS({
			navigation: {
				route: {
					location: {},
					match: {
						path: "/:scope/Bar",
						params: { scope: "Foo" },
					},
				},
			},
		});
		store = {
			getState: () => state,
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
		};
		onSelectedSpy = sinon.spy();
	});

	const theme = createMuiTheme();

	const scopes = [
		{
			id: "Test1",
			children: ["Test12", "Test13"],
			name: "Test Global",
			type: scopeTypes.global,
			scopePath: ["Test1"],
		},
		{
			id: "Test12",
			children: ["Test121"],
			name: "Test Virtual 12",
			type: scopeTypes.virtual,
			scopePath: ["Test1", "Test12"],
		},
		{
			id: "Test13",
			children: ["Test131"],
			name: "Test Virtual 13",
			type: scopeTypes.virtual,
			scopePath: ["Test1", "Test13"],
		},
		{
			id: "Test121",
			children: [],
			name: "Test Virtual 121",
			type: scopeTypes.sale,
			scopePath: ["Test1", "Test12", "Test121"],
		},
		{
			id: "Test131",
			children: [],
			name: "Test Virtual 131",
			type: scopeTypes.sale,
			scopePath: ["Test1", "Test13", "Test131"],
		},
	];

	const getScope = id => scopes.find(scope => scope.id === id);

	it("Renders ScopeTreeView correctly with existing scopes ids", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={scopes[0].id}
					expanded={scopes[0].scopePath}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeViewMui expanded={scopes[0].scopePath} selected={[scopes[0].id]}>
					<TreeItem scope={scopes[0]} rootId={scopes[0].id}>
						<TreeItem scope={scopes[1]} rootId={scopes[0].id}>
							<TreeItem scope={scopes[3]} rootId={scopes[0].id} />
						</TreeItem>
						<TreeItem scope={scopes[2]} rootId={scopes[0].id}>
							<TreeItem scope={scopes[4]} rootId={scopes[0].id} />
						</TreeItem>
					</TreeItem>
				</TreeViewMui>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders ScopeTreeView correctly with non existing scope id", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView rootId="WrongId" getScope={getScope} selected={scopes[0].id} expanded={scopes[0].scopePath} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeViewMui expanded={scopes[0].scopePath} selected={[scopes[0].id]} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders ScopeTreeView correctly with non existing selected", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView rootId={scopes[0].id} getScope={getScope} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeViewMui selected={[]}>
					<TreeItem scope={scopes[0]} rootId={scopes[0].id} />
				</TreeViewMui>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Handles onNodeToggle correctly", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={scopes[0].id}
					expanded={scopes[0].scopePath}
					onSelected={onSelectedSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let treeView = mountedComponent.find(TreeViewMui);

		expect(treeView.prop("expanded"), "to equal", scopes[0].scopePath);

		treeView.invoke("onNodeToggle")(null, scopes[1].scopePath);

		treeView = mountedComponent.find(TreeViewMui);

		expect(treeView.prop("expanded"), "to equal", scopes[1].scopePath);
	});

	it("Handles multiple select correctly", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={[scopes[1].id]}
					expanded={scopes[1].scopePath}
					multipleSelect={true}
					onSelected={onSelectedSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(onSelectedSpy, "to have calls satisfying", [{ args: [event, [scopes[3].id, scopes[1].id]] }]);

		mountedComponent.update();
		treeView = mountedComponent.find(TreeViewMui);
		item = treeView.find(TreeItemMui).at(2);

		item.invoke("onLabelClick")(event);

		expect(onSelectedSpy, "to have calls satisfying", [
			{ args: [event, [scopes[3].id, scopes[1].id]] },
			{ args: [event, [scopes[1].id]] },
		]);
	});

	it("Handles single select correctly", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={scopes[1].id}
					expanded={scopes[1].scopePath}
					onSelected={onSelectedSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(onSelectedSpy, "to have calls satisfying", [{ args: [event, scopes[3].id] }]);
	});

	it("Selection is ignored when isScopeSelectable is defined and returns false", () => {
		const isScopeSelectableSpy = sinon.spy(() => false).named("isScopeSelectable");
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={scopes[1].id}
					expanded={scopes[1].scopePath}
					onSelected={onSelectedSpy}
					isScopeSelectable={isScopeSelectableSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(onSelectedSpy, "was not called");
	});

	it("Selection is accepted when isScopeSelectable is defined and returns true", () => {
		const isScopeSelectableSpy = sinon.spy(() => true).named("isScopeSelectable");
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<ScopeTreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selected={scopes[1].id}
					expanded={scopes[1].scopePath}
					onSelected={onSelectedSpy}
					isScopeSelectable={isScopeSelectableSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(onSelectedSpy, "to have calls satisfying", [{ args: [event, scopes[3].id] }]);
	});
});
