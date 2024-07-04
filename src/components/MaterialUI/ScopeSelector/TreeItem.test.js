import React from "react";
import TreeItem, { ScopeIcon, ScopeLabel } from "./TreeItem";
import TreeItemMui from "@material-ui/lab/TreeItem";
import Icon from "./../DataDisplay/Icon";
import MultipleLinesText from "./../DataDisplay/TooltippedElements/MultipleLinesText";
import TextProps from "./../textProps";
import Immutable from "immutable";
import { scopeTypes } from "./../../../constants";
import sinon from "sinon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";
import { mount } from "enzyme";

describe("TreeItem", () => {
	let store, state;
	const closeSelectorSpy = sinon.spy();

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
	});

	afterEach(() => {
		closeSelectorSpy.resetHistory();
	});

	const globalScope = {
		id: "Global",
		name: "Global",
		type: scopeTypes.global,
		children: ["TestVirtual"],
	};
	const virtualScope = {
		id: "TestVirtual",
		name: "Test Virtual",
		type: scopeTypes.virtual,
		children: ["TestSale"],
	};

	const inActiveScope = {
		id: "TestInactive",
		name: "Test Inactive",
		type: scopeTypes.sale,
		children: [],
		isActive: false,
	};

	const saleScope = {
		id: "TestSale",
		name: "Test Sale",
		type: scopeTypes.sale,
		children: [],
	};

	const rootId = "Global";

	const expandIcon = <Icon id="dropdown-chevron-down" />;
	const collapseIcon = <Icon id="dropdown-chevron-up" />;

	const theme = createMuiTheme();

	it("Renders Tree Item correctly for global scope", () => {
		const expectedGlobalLabel = (
			<ScopeLabel name={globalScope.name} type={globalScope.type} isRootScope={true} isVirtualScope={false} />
		);

		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem scope={globalScope} rootId={rootId} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TreeItemMui nodeId={globalScope.id} label={expectedGlobalLabel} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Tree Item correctly for virtual scope", () => {
		const expectedVirtualLabel = (
			<ScopeLabel name={virtualScope.name} type={virtualScope.type} isRootScope={false} isVirtualScope={false} />
		);

		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem scope={virtualScope} rootId={rootId} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TreeItemMui
					nodeId={virtualScope.id}
					label={expectedVirtualLabel}
					expandIcon={expandIcon}
					collapseIcon={collapseIcon}
				/>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Tree Item correctly for not active Scope", () => {
		const expectedVirtualLabel = (
			<ScopeLabel
				name={inActiveScope.name}
				type={inActiveScope.type}
				isRootScope={false}
				isVirtualScope={false}
				isActive={false}
			/>
		);

		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem scope={inActiveScope} rootId={rootId} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TreeItemMui
					nodeId={inActiveScope.id}
					label={expectedVirtualLabel}
					expandIcon={expandIcon}
					collapseIcon={collapseIcon}
				/>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls scope select handler on label click if scope type is not virtual", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem scope={saleScope} rootId={rootId} onScopeSelect={closeSelectorSpy} />
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const saleScopeLabel = mountedComponent.find(TreeItemMui);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		saleScopeLabel.invoke("onLabelClick")(event);

		expect(preventDefaultSpy, "was called");
		expect(closeSelectorSpy, "to have a call satisfying", { args: [event, saleScope.id] });
	});

	it("Does not calls scope select handler on label click if scope type is virtual", () => {
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem scope={virtualScope} rootId={rootId} onScopeSelect={closeSelectorSpy} />
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const virtualScopeLabel = mountedComponent.find(TreeItemMui);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		virtualScopeLabel.invoke("onLabelClick")(event);

		expect(preventDefaultSpy, "was called once");
		expect(closeSelectorSpy, "to have no calls satisfying", { args: [event] });
	});

	it("Does not calls scope select handler on label click if isScopeSelectable is defined and returns false", () => {
		const isScopeSelectableSpy = sinon.spy(() => false).named("isScopeSelectable");
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem
					scope={saleScope}
					rootId={rootId}
					onScopeSelect={closeSelectorSpy}
					isScopeSelectable={isScopeSelectableSpy}
				/>
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const saleScopeLabel = mountedComponent.find(TreeItemMui);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		saleScopeLabel.invoke("onLabelClick")(event);

		expect(preventDefaultSpy, "was called");
		expect(closeSelectorSpy, "was not called");
	});

	it("Calls scope select handler on label click if isScopeSelectable is defined and returns true", () => {
		const isScopeSelectableSpy = sinon.spy(() => true).named("isScopeSelectable");
		const component = (
			<TestWrapper provider={{ store }} memoryRouter stylesProvider muiThemeProvider={{ theme }}>
				<TreeItem
					scope={saleScope}
					rootId={rootId}
					onScopeSelect={closeSelectorSpy}
					isScopeSelectable={isScopeSelectableSpy}
				/>
			</TestWrapper>
		);

		const preventDefaultSpy = sinon.spy();

		const mountedComponent = mount(component);

		const saleScopeLabel = mountedComponent.find(TreeItemMui);

		const event = {
			preventDefault: preventDefaultSpy,
		};

		saleScopeLabel.invoke("onLabelClick")(event);

		expect(preventDefaultSpy, "was called");
		expect(closeSelectorSpy, "to have no calls satisfying", { args: [event] });
	});
});

describe("ScopeLabel", () => {
	const scopeName = "Test";
	const theme = createMuiTheme();

	it("Renders Scope Label for root scope correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeLabel name={scopeName} type={scopeTypes.global} isRootScope />
			</TestWrapper>
		);

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<ScopeIcon type={scopeTypes.global} />
					<MultipleLinesText textProps={multipleLinesTextProps} children={scopeName} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Scope Label for non root scope correctly", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeLabel name={scopeName} type={scopeTypes.virtual} isRootScope={false} />
			</TestWrapper>
		);

		const multipleLinesTextProps = new TextProps();
		multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					<ScopeIcon type={scopeTypes.virtual} />
					<MultipleLinesText textProps={multipleLinesTextProps} children={scopeName} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});

describe("ScopeIcon", () => {
	const theme = createMuiTheme();

	it("Renders correct Icon for scope type Global", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeIcon type={scopeTypes.global} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Icon color="primary" fontSize="medium" id="global-scope" />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders correct Icon for scope type Virtual", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeIcon type={scopeTypes.virtual} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Icon themeColor={theme.palette.grey.dark} fontSize="medium" id="virtual-scope" />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders correct Icon for scope type Sales", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeIcon type={scopeTypes.sale} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Icon color="primary" fontSize="medium" id="sales-scope" />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders correct Icon for scope type Dependant", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeIcon type={scopeTypes.dependant} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Icon themeColor={theme.palette.success.main} fontSize="medium" id="dependent-scope" />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders nothing if type is wrong", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<ScopeIcon type="Wrong" />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);
	});
});
