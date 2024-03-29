import React from "react";
import { mount } from "enzyme";
import TabBar, { TabLink } from "./TabBar";
import Tabs from "@material-ui/core/Tabs";
import TabLabel from "./TabLabel";
import Tab from "@material-ui/core/Tab";
import Select from "../Inputs/Select";
import SelectProps from "../Inputs/SelectProps";
import Icon from "../DataDisplay/Icon";
import { FormattedMessage } from "react-intl";
import Immutable from "immutable";
import ResizeDetector from "react-resize-detector";
import sinon from "sinon";
import { createMemoryHistory } from "history";
import SelectMUI from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import ConfirmationModal from "./../DataDisplay/PredefinedElements/ConfirmationModal";
import { removeEditNode } from "./../../../actions/view";
import * as domHelper from "./../../../utils/domHelper";
import * as useDispatchWithModulesData from "./../../../hooks/useDispatchWithModulesData";
import * as ReactMock from "react";
import sharedMessages from "./../../../sharedMessages";
import { TestWrapper, createMuiTheme, extractMessages } from "./../../../utils/testUtils";
import { SET_CLOSING_TAB_HANDLER_ACTIONS } from "../../../actions/navigation";

const messages = extractMessages(sharedMessages);

describe("TabBar", () => {
	let store, state;
	const history = createMemoryHistory({ initialEntries: ["/"] });
	sinon.spy(history, "push");

	const module = {
		icon: "cloud",
		label: messages.module1,
		href: "/Scope1/module1",
		active: true,
	};

	const pages = [
		{
			label: messages.page1,
			href: "/Scope1/module1/page1",
			params: { scope: "Scope1", entityId: "page1" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:entityId",
		},
		{
			label: messages.page2,
			href: "/Scope1/module1/page2",
			params: { scope: "Scope1", entityId: "page2" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:entityId",
		},
		{
			label: messages.page3,
			href: "/Scope1/module1/page3",
			params: { scope: "Scope1", entityId: "page3" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:entityId",
		},
		{
			label: messages.page4,
			href: "/Scope1/module1/aParamPath/page4",
			params: { scope: "Scope1", someParamPath: "aParamPath", someEntityId: "page4" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:someParamPath/:someEntityId",
		},
		{
			label: messages.page5,
			href: "/Scope1/module1/aParamPath/page5",
			params: { scope: "Scope1", someParamPath: "aParamPath", someEntityId: "page5" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:someParamPath/:someEntityId",
		},
		{
			label: messages.page6,
			href: "/Scope1/module1/new",
			params: { scope: "Scope1" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/new",
		},
	];

	const closeIcon = <Icon id="close" />;

	const moduleIcon = <Icon id={module.icon} />;

	const moduleTabLabel = <TabLabel label={messages.module1} />;
	const page1TabLabel = <TabLabel label={messages.page1} />;
	const page2TabLabel = <TabLabel label={messages.page2} />;
	const page3TabLabel = <TabLabel label={messages.page3} />;
	const page4TabLabel = <TabLabel label={messages.page4} />;
	const page5TabLabel = <TabLabel label={messages.page5} />;
	const pageNewTabLabel = <TabLabel label={messages.pageNew} />;

	const selectProps = new SelectProps();
	selectProps.set(SelectProps.propNames.iconSelect, true);
	selectProps.set(SelectProps.propNames.value, "");
	selectProps.set(SelectProps.propNames.update, jest.fn());

	const tabLabels = [];

	tabLabels.push({
		value: 0,
		label: page1TabLabel,
		sortOrder: 0,
		outsideScope: false,
	});
	tabLabels.push({
		value: 1,
		label: page2TabLabel,
		sortOrder: 1,
		outsideScope: true,
	});
	tabLabels.push({
		value: 2,
		label: page3TabLabel,
		sortOrder: 2,
		outsideScope: false,
	});
	tabLabels.push({
		value: 3,
		label: page4TabLabel,
		sortOrder: 3,
		outsideScope: false,
	});
	tabLabels.push({
		value: 4,
		label: page5TabLabel,
		sortOrder: 4,
		outsideScope: false,
	});
	tabLabels.push({
		value: 5,
		label: pageNewTabLabel,
		sortOrder: 5,
		outsideScope: false,
	});

	const select = (
		<div>
			<Select options={tabLabels} selectProps={selectProps} />
		</div>
	);

	const expectedModuleTab = (
		<Tab label={moduleTabLabel} key={module.href} to={module.href} icon={moduleIcon} component={TabLink} />
	);

	const wrappedPage1TabLabel = (
		<div>
			<TabLabel label={messages.page1} />
		</div>
	);
	const wrappedPage2TabLabel = (
		<div>
			<TabLabel label={messages.page2} />
		</div>
	);
	const wrappedPage3TabLabel = (
		<div>
			<TabLabel label={messages.page3} />
			<span>*</span>
		</div>
	);
	const wrappedPage4TabLabel = (
		<div>
			<TabLabel label={messages.page4} />
		</div>
	);
	const wrappedPage5TabLabel = (
		<div>
			<TabLabel label={messages.page5} />
			<span>*</span>
		</div>
	);
	const wrappedPageNewTabLabel = (
		<div>
			<TabLabel label={messages.pageNew} />
			<span>*</span>
		</div>
	);

	const expectedTabs = (
		<Tabs value={false} variant="scrollable" scrollButtons="auto">
			<Tab
				label={wrappedPage1TabLabel}
				key={pages[0].href}
				to={pages[0].href}
				value={0}
				component={TabLink}
				close={closeIcon}
				disabled={pages[0].outsideScope}
			/>
			<Tab
				label={wrappedPage2TabLabel}
				key={pages[1].href}
				to={pages[1].href}
				value={1}
				component={TabLink}
				close={closeIcon}
				disabled={pages[1].outsideScope}
			/>
			<Tab
				label={wrappedPage3TabLabel}
				key={pages[2].href}
				to={pages[2].href}
				value={2}
				component={TabLink}
				close={closeIcon}
				disabled={pages[2].outsideScope}
			/>
			<Tab
				label={wrappedPage4TabLabel}
				key={pages[3].href}
				to={pages[3].href}
				value={3}
				component={TabLink}
				close={closeIcon}
				disabled={pages[3].outsideScope}
			/>
			<Tab
				label={wrappedPage5TabLabel}
				key={pages[4].href}
				to={pages[4].href}
				value={4}
				component={TabLink}
				close={closeIcon}
				disabled={pages[4].outsideScope}
			/>
			<Tab
				label={wrappedPageNewTabLabel}
				key={pages[5].href}
				to={pages[5].href}
				value={5}
				component={TabLink}
				close={closeIcon}
				disabled={pages[5].outsideScope}
			/>
		</Tabs>
	);

	const expectedIconTabs = (
		<Tabs value={false} variant="scrollable" scrollButtons="auto">
			<Tab
				label={wrappedPage1TabLabel}
				icon={<Icon id="settings" />}
				key={pages[0].href}
				to={pages[0].href}
				value={0}
				component={TabLink}
				close={closeIcon}
				disabled={pages[0].outsideScope}
			/>
			<Tab
				label={wrappedPage2TabLabel}
				icon={<Icon id="settings" />}
				key={pages[1].href}
				to={pages[1].href}
				value={1}
				component={TabLink}
				close={closeIcon}
				disabled={pages[1].outsideScope}
			/>
			<Tab
				label={wrappedPage3TabLabel}
				icon={<Icon id="settings" />}
				key={pages[2].href}
				to={pages[2].href}
				value={2}
				component={TabLink}
				close={closeIcon}
				disabled={pages[2].outsideScope}
			/>
			<Tab
				label={wrappedPage4TabLabel}
				icon={<Icon id="settings" />}
				key={pages[3].href}
				to={pages[3].href}
				value={3}
				component={TabLink}
				close={closeIcon}
				disabled={pages[3].outsideScope}
			/>
			<Tab
				label={wrappedPage5TabLabel}
				icon={<Icon id="settings" />}
				key={pages[4].href}
				to={pages[4].href}
				value={4}
				component={TabLink}
				close={closeIcon}
				disabled={pages[4].outsideScope}
			/>
			<Tab
				label={wrappedPageNewTabLabel}
				key={pages[5].href}
				to={pages[5].href}
				value={5}
				component={TabLink}
				close={closeIcon}
				disabled={pages[5].outsideScope}
			/>
		</Tabs>
	);

	beforeEach(() => {
		pages[2].entityIdResolver = undefined;
		module.closingTabHandler = null;

		state = Immutable.fromJS({
			modules: {
				tree: {},
			},
			view: {
				edit: {
					module1: {
						page3: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
						},
						page5: {
							section1: {
								model: {
									field1: {
										value: "smth",
										wasModified: true,
									},
								},
							},
						},
						new: {
							section1: {
								model: {
									field1: {
										value: "smth",
										error: "smth",
										wasModified: true,
									},
								},
							},
						},
					},
				},
			},
			navigation: {
				route: {
					match: {
						url: "/Scope1/module1/page1",
						path: "/:scope/module1/page1",
						params: { scope: "Scope1" },
					},
				},
				config: { prependPath: "/:scope/", prependHref: "/Scope1/" },
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};

		pages[3] = {
			label: messages.page4,
			href: "/Scope1/module1/aParamPath/page4",
			params: { scope: "Scope1", someParamPath: "aParamPath", someEntityId: "page4" },
			active: false,
			close: sinon.spy(),
			path: "/:scope/module1/:someParamPath/:someEntityId",
		};
	});

	beforeEach(() => {
		history.push.resetHistory();
	});

	const theme = createMuiTheme();

	it("Renders TabBar correctly", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<ResizeDetector />
					{expectedModuleTab}
					{expectedTabs}
					<ConfirmationModal message={<FormattedMessage {...sharedMessages.unsavedChanges} />} open={false} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TabBar correctly with closing tab handler", () => {
		store.dispatch = sinon.spy().named("dispatch");

		pages[2].entityIdResolver = () => null;

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				router={{ history }}
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} moduleName={"module1"} pages={pages} />
			</TestWrapper>
		);

		module.closingTabHandler = {
			handler: () => {},
			entitySelector: params => (params?.entityId !== "page3" ? { entityId: "entityId", entity: {} } : null),
		};

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				router={{ history }}
				muiThemeProvider={{ theme }}
			>
				<div>
					<ResizeDetector />
					{expectedModuleTab}
					{expectedTabs}
					<ConfirmationModal message={<FormattedMessage {...sharedMessages.unsavedChanges} />} open={false} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);

		expect(store.dispatch, "was called once");
		expect(store.dispatch.getCall(0).args.length, "to equal", 1);
		expect(store.dispatch.getCall(0).args[0].type, "to equal", SET_CLOSING_TAB_HANDLER_ACTIONS);
		expect(store.dispatch.getCall(0).args[0].payload.module, "to equal", "module1");
		expect(store.dispatch.getCall(0).args[0].payload.actions.length, "to equal", 5);
	});

	it("Close the tab correctly using closing tab handler actions", () => {
		store.dispatch = sinon.spy().named("dispatch");

		pages[2].entityIdResolver = () => null;

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				stylesProvider
				router={{ history }}
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} moduleName={"module1"} pages={pages} />
			</TestWrapper>
		);

		module.closingTabHandler = {
			handler: () => {},
			entitySelector: params => (params?.entityId !== "page3" ? { entityId: "entityId", entity: {} } : null),
		};

		mount(component);

		expect(store.dispatch, "was called once");
		expect(store.dispatch.getCall(0).args.length, "to equal", 1);
		expect(store.dispatch.getCall(0).args[0].type, "to equal", SET_CLOSING_TAB_HANDLER_ACTIONS);
		expect(store.dispatch.getCall(0).args[0].payload.module, "to equal", "module1");
		expect(store.dispatch.getCall(0).args[0].payload.actions.length, "to equal", 5);

		store.dispatch.getCall(0).args[0].payload.actions[1].closeTab({});

		expect(pages[1].close, "was called");

		expect(history.push, "to have a call satisfying", { args: [pages[2].href] });
	});

	it("Close the tab correctly using closing tab handler actions without affecting routing", () => {
		store.dispatch = sinon.spy().named("dispatch");

		pages[2].entityIdResolver = () => null;

		const component = (
			<TestWrapper
				provider={{ store }}
				intlProvider={{ messages }}
				stylesProvider
				router={{ history }}
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} moduleName={"module1"} pages={pages} />
			</TestWrapper>
		);

		module.closingTabHandler = {
			handler: () => {},
			entitySelector: params => (params?.entityId !== "page3" ? { entityId: "entityId", entity: {} } : null),
		};

		mount(component);

		expect(store.dispatch, "was called once");
		expect(store.dispatch.getCall(0).args.length, "to equal", 1);
		expect(store.dispatch.getCall(0).args[0].type, "to equal", SET_CLOSING_TAB_HANDLER_ACTIONS);
		expect(store.dispatch.getCall(0).args[0].payload.module, "to equal", "module1");
		expect(store.dispatch.getCall(0).args[0].payload.actions.length, "to equal", 5);

		store.dispatch.getCall(0).args[0].payload.actions[1].closeTab({}, true);

		expect(pages[1].close, "was called");

		expect(history.push, "was not called");
	});

	it("Contains proper Select and Modal elements when they are visible", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = jest.fn();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(() => [true, setState]);

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<ResizeDetector />
					{expectedModuleTab}
					{expectedTabs}
					{select}
					<ConfirmationModal message={<FormattedMessage {...sharedMessages.unsavedChanges} />} open={true} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls history.push to module link when module tab is clicked", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const moduleTab = mountedComponent.find(Tab).at(0);

		moduleTab.simulate("click");

		expect(history.push, "to have a call satisfying", { args: [module.href] });
	});

	it("Calls history.push to page link when page tab is clicked", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(2);

		pageTab.simulate("click");

		expect(history.push, "to have a call satisfying", { args: [pages[1].href] });
	});

	it("Calls history.push to page link when page tab is selected via Select", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = jest.fn();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(() => [true, setState]);

		const mountedComponent = mount(component);

		const select = mountedComponent.find(SelectMUI);

		select.invoke("onChange")({ target: { value: 2 } });

		expect(history.push, "to have a call satisfying", { args: [pages[2].href] });
	});

	it("Calls correct close callback when close icon for specific page tab is clicked and tab was not modified", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const dispatchSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesData, "useDispatchWithModulesData")
			.returns(dispatchSpy);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(1);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		expect(pages[0].close, "was called");

		expect(dispatchSpy, "to have a call satisfying", { args: [removeEditNode, [pages[0].params.entityId]] });

		useDispatchWithModulesDataStub.restore();
	});

	it("Calls correct close callback when close icon for specific page tab is clicked with a custom entity resolver", () => {
		pages[3].entityIdResolver = () => "someCustomId";

		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const dispatchSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesData, "useDispatchWithModulesData")
			.returns(dispatchSpy);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(4);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		expect(pages[3].close, "was called");

		expect(dispatchSpy, "to have a call satisfying", { args: [removeEditNode, ["someCustomId"]] });

		useDispatchWithModulesDataStub.restore();
	});

	it("Calls correct close callback when close icon for specific page tab with multiple params is clicked and tab was not modified", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const dispatchSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesData, "useDispatchWithModulesData")
			.returns(dispatchSpy);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(4);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		expect(pages[3].close, "was called");

		expect(dispatchSpy, "to have a call satisfying", { args: [removeEditNode, [pages[3].params.someEntityId]] });

		useDispatchWithModulesDataStub.restore();
	});

	it("Calls correct close callback when close icon for specific page tab is clicked and tab was modified", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = sinon.spy();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(value => [value, setState]);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(3);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		expect(setState, "to have a call satisfying", { args: [{ closeCallback: pages[2].close }] });

		expect(setState, "to have a call satisfying", { args: [true] });
	});

	it("Calls correct close callback when close icon for specific page tab with multiple params is clicked and tab was modified", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = sinon.spy();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(value => [value, setState]);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(5);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		expect(setState, "to have a call satisfying", { args: [{ closeCallback: pages[4].close }] });

		expect(setState, "to have a call satisfying", { args: [true] });
	});

	it("Handles onResize correct when isScrollVisible returns false", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				router={{ history }}
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = sinon.spy();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(value => [value, setState]);

		const isScrollVisibleStub = sinon.stub(domHelper, "isScrollVisible").returns(false);

		const mountedComponent = mount(component);

		const resizeDetector = mountedComponent.find(ResizeDetector);

		resizeDetector.invoke("onResize")();

		expect(isScrollVisibleStub.getCall(0).args[0].className, "to equal", "MuiTabs-flexContainer");

		expect(setState, "to have a call satisfying", { args: [false] });

		isScrollVisibleStub.restore();
		useStateSpy.mockRestore();
	});

	it("Handles onResize correct when isScrollVisible returns true", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const setState = sinon.spy();
		const useStateSpy = jest.spyOn(React, "useState");
		useStateSpy.mockImplementation(value => [value, setState]);

		const mountedComponent = mount(component);

		const isScrollVisibleStub = sinon.stub(domHelper, "isScrollVisible").returns(true);

		const resizeDetector = mountedComponent.find(ResizeDetector);

		resizeDetector.invoke("onResize")();

		expect(isScrollVisibleStub.getCall(0).args[0].className, "to equal", "MuiTabs-flexContainer");

		expect(setState, "to have a call satisfying", { args: [true] });

		isScrollVisibleStub.restore();
		useStateSpy.mockRestore();
	});

	it("Closes tab when ok callback in confirmation modal is triggered", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const dispatchSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesData, "useDispatchWithModulesData")
			.returns(dispatchSpy);

		const useStateStub = sinon.stub(ReactMock, "useState");
		useStateStub.withArgs(undefined).returns([{ closeCallback: pages[2].close, href: pages[2].href }, jest.fn()]);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(3);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		let confirmationModal = mountedComponent.find(ConfirmationModal);

		confirmationModal.invoke("okCallback")();

		confirmationModal = mountedComponent.find(ConfirmationModal);

		expect(confirmationModal.prop("open"), "to be false");
		expect(pages[2].close, "was called");
		expect(dispatchSpy, "to have a call satisfying", { args: [removeEditNode, [pages[2].params.entityId]] });

		useDispatchWithModulesDataStub.restore();
		useStateStub.restore();
	});

	it("Closes confirmation modal when cancelCallback is triggered", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(3);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		let confirmationModal = mountedComponent.find(ConfirmationModal);

		confirmationModal.invoke("cancelCallback")();

		confirmationModal = mountedComponent.find(ConfirmationModal);

		expect(confirmationModal.prop("open"), "to be false");
	});

	it("Closes confirmation modal when backdropClickCallback is triggered", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(3);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		let confirmationModal = mountedComponent.find(ConfirmationModal);

		confirmationModal.invoke("backdropClickCallback")();

		confirmationModal = mountedComponent.find(ConfirmationModal);

		expect(confirmationModal.prop("open"), "to be false");
	});

	it("Remove edit mode for new tab with modifications when close ok callback in confirmation modal is triggered", () => {
		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const dispatchSpy = sinon.spy();
		const useDispatchWithModulesDataStub = sinon
			.stub(useDispatchWithModulesData, "useDispatchWithModulesData")
			.returns(dispatchSpy);

		const useStateStub = sinon.stub(ReactMock, "useState");
		useStateStub.withArgs(undefined).returns([{ closeCallback: pages[5].close, href: pages[5].href }, jest.fn()]);

		const mountedComponent = mount(component);

		const pageTab = mountedComponent.find(Tab).at(6);
		const closeIcon = pageTab.find(Icon);

		closeIcon.simulate("click");

		let confirmationModal = mountedComponent.find(ConfirmationModal);

		confirmationModal.invoke("okCallback")();

		confirmationModal = mountedComponent.find(ConfirmationModal);

		expect(confirmationModal.prop("open"), "to be false");
		expect(pages[5].close, "was called");
		expect(dispatchSpy, "to have a call satisfying", { args: [removeEditNode, ["new"]] });

		useDispatchWithModulesDataStub.restore();
		useStateStub.restore();
	});

	it("Renders Tab icons properly", () => {
		pages[0].icon = "settings";
		pages[1].icon = "settings";
		pages[2].icon = "settings";
		pages[2].isDetails = false;
		pages[3].icon = "settings";
		pages[3].isDetails = true;
		pages[4].icon = "settings";
		pages[4].isDetails = true;

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TabBar module={module} pages={pages} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<ResizeDetector />
					{expectedModuleTab}
					{expectedIconTabs}
					<ConfirmationModal message={<FormattedMessage {...sharedMessages.unsavedChanges} />} open={false} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);

		const mountedComponent = mount(component);
		const detailsTab1 = mountedComponent.find(Tab).at(1);
		const detailsTab2 = mountedComponent.find(Tab).at(2);
		const detailsTab3 = mountedComponent.find(Tab).at(3);
		const detailsTab4 = mountedComponent.find(Tab).at(4);
		const detailsTab5 = mountedComponent.find(Tab).at(5);

		expect(detailsTab1.prop("icon").props.className, "to contain", "makeStyles-moduleIcon");
		expect(detailsTab2.prop("icon").props.className, "to contain", "makeStyles-moduleIcon");
		expect(detailsTab3.prop("icon").props.className, "to contain", "makeStyles-moduleIcon");
		expect(detailsTab4.prop("icon").props.className, "to contain", "makeStyles-sectionIcon");
		expect(detailsTab5.prop("icon").props.className, "to contain", "makeStyles-sectionIcon");
	});
});

describe("TabLink", () => {
	it("Renders TabLink correctly", () => {
		const href = "link";
		const child = <div>child</div>;
		const close = <div>close</div>;

		const component = (
			<TestWrapper memoryRouter>
				<TabLink to={href} close={close}>
					{child}
				</TabLink>
			</TestWrapper>
		);

		const expected = (
			<TestWrapper memoryRouter>
				<Link to={href}>
					{child}
					{close}
				</Link>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
