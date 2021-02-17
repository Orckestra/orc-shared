import React from "react";
import Immutable from "immutable";
import { scopeTypes } from "./../../../constants";
import sinon from "sinon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import { mount, shallow } from "enzyme";
import TreeItem from "./TreeItem";
import TreeViewMui from "@material-ui/lab/TreeView";
import TreeItemMui from "@material-ui/lab/TreeItem";
import TreeView from "./TreeView";

describe("TreeView", () => {
	let store, state, closeSelectorSpy;

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
		closeSelectorSpy = sinon.spy();
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

	it("Renders TreeView correctly with existing scopes ids", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selectedScope={scopes[0]}
					closeSelector={closeSelectorSpy}
				/>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeViewMui expanded={scopes[0].scopePath} selected={scopes[0].id}>
					<TreeItem scope={scopes[0]} rootId={scopes[0].id} closeSelector={closeSelectorSpy}>
						<TreeItem scope={scopes[1]} rootId={scopes[0].id} closeSelector={closeSelectorSpy}>
							<TreeItem scope={scopes[3]} rootId={scopes[0].id} closeSelector={closeSelectorSpy} />
						</TreeItem>
						<TreeItem scope={scopes[2]} rootId={scopes[0].id} closeSelector={closeSelectorSpy}>
							<TreeItem scope={scopes[4]} rootId={scopes[0].id} closeSelector={closeSelectorSpy} />
						</TreeItem>
					</TreeItem>
				</TreeViewMui>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TreeView correctly with non existing scope id", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeView rootId="WrongId" getScope={getScope} selectedScope={scopes[0]} closeSelector={closeSelectorSpy} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeViewMui expanded={scopes[0].scopePath} selected={scopes[0].id} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Handles onNodeToggle correctly", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selectedScope={scopes[0]}
					closeSelector={closeSelectorSpy}
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
				<TreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selectedScope={scopes[1]}
					closeSelector={closeSelectorSpy}
					multipleSelect={true}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(closeSelectorSpy, "to have calls satisfying", [{ args: [event, [scopes[3].id, scopes[1].id]] }]);

		mountedComponent.update();
		treeView = mountedComponent.find(TreeViewMui);
		item = treeView.find(TreeItemMui).at(2);

		item.invoke("onLabelClick")(event);

		expect(closeSelectorSpy, "to have calls satisfying", [
			{ args: [event, [scopes[3].id, scopes[1].id]] },
			{ args: [event, [scopes[1].id]] },
		]);
	});

	it("Handles single select correctly", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeView
					rootId={scopes[0].id}
					getScope={getScope}
					selectedScope={scopes[1]}
					closeSelector={closeSelectorSpy}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		let treeView = mountedComponent.find(TreeViewMui);
		let item = treeView.find(TreeItemMui).at(2);

		const event = { preventDefault: sinon.spy() };

		item.invoke("onLabelClick")(event);

		expect(closeSelectorSpy, "to have calls satisfying", [{ args: [event, scopes[3].id] }]);
	});
});
