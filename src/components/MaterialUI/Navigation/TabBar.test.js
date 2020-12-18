import React from "react";
import { mount } from "enzyme"
import TabBar, { TabLink } from "./TabBar";
import Tabs from '@material-ui/core/Tabs';
import TabLabel from "./TabLabel";
import Tab from '@material-ui/core/Tab';
import Select from "../Inputs/Select";
import SelectProps from "../Inputs/SelectProps";
import Icon from "../DataDisplay/Icon";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Immutable from "immutable";
import { Router, MemoryRouter } from "react-router-dom";
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
import { extractMessages } from "./../../../utils/testUtils";
import sharedMessages from "./../../../sharedMessages";
import { stringifyWithoutQuotes } from "./../../../utils/parseHelper";

const messages = extractMessages(sharedMessages);

describe("TabBar", () => {
  let store, state;
  const history = createMemoryHistory({ initialEntries: ["/"] });
  sinon.spy(history, "push");

  const module = {
    icon: 'cloud',
    label: messages.module1,
    href: '/Scope1/module1',
    active: true,
  };

  const pages = [
    {
      label: messages.page1,
      href: '/Scope1/module1/page1',
      params: { scope: "Scope1", entityId: "page1" },
      active: false,
      close: sinon.spy()
    },
    {
      label: messages.page2,
      href: '/Scope1/module1/page2',
      params: { scope: "Scope1", entityId: "page2" },
      active: false,
      close: sinon.spy()
    },
    {
      label: messages.page3,
      href: '/Scope1/module1/page3',
      params: { scope: "Scope1", entityId: "page3" },
      active: false,
      close: sinon.spy()
    },
  ];

  const closeIcon = <Icon id="close" />;

  const moduleIcon = <Icon id={module.icon} />;

  const moduleTabLabel = <TabLabel label={messages.module1} />;
  const page1TabLabel = <TabLabel label={messages.page1} />;
  const page2TabLabel = <TabLabel label={messages.page2} />;
  const page3TabLabel = <TabLabel label={messages.page3} />;

  const selectProps = new SelectProps();
  selectProps.set(SelectProps.propNames.iconSelect, true);
  selectProps.set(SelectProps.propNames.value, '');
  selectProps.set(SelectProps.propNames.update, jest.fn());

  const tabLabels = [];

  tabLabels.push({
    value: 0,
    label: page1TabLabel,
    sortOrder: 0,
    outsideScope: false
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
    outsideScope: false
  });

  const select = <div><Select options={tabLabels} selectProps={selectProps} /></div>;

  const expectedModuleTab = (
    <Tab
      label={moduleTabLabel}
      key={module.href}
      to={module.href}
      icon={moduleIcon}
      component={TabLink}
    />
  );

  const wrappedPage1TabLabel = <div><TabLabel label={messages.page1} /></div>;
  const wrappedPage2TabLabel = <div><TabLabel label={messages.page2} /></div>;
  const wrappedPage3TabLabel = (
    <div>
      <TabLabel label={messages.page3} />
      <span>*</span>
    </div>
  );

  const expectedTabs = (
    <Tabs
      value={false}
      variant="scrollable"
      scrollButtons="auto"
    >
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
    </Tabs>
  );

  beforeEach(() => {
    state = Immutable.fromJS({
      modules: {
        tree: {}
      },
      view: {
        edit: {
          module1: {
            page3: {
              section1: {
                wasModified: true
              }
            }
          }
        }
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
      subscribe: () => { },
      getState: () => state,
      dispatch: () => { },
    };
  });

  it("Renders TabBar correctly", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const expected = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <div>
              <ResizeDetector />
              {expectedModuleTab}
              {expectedTabs}
              <ConfirmationModal
                message={stringifyWithoutQuotes(messages['orc-shared.unsavedChanges'])}
                open={false}
              />
            </div>
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Contains proper Select and Modal elements when they are visible", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [true, setState]);

    const expected = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <div>
              <ResizeDetector />
              {expectedModuleTab}
              {expectedTabs}
              {select}
              <ConfirmationModal
                message={stringifyWithoutQuotes(messages['orc-shared.unsavedChanges'])}
                open={true}
              />
            </div>
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Calls history.push to module link when module tab is clicked", () => {
    const component = (
      <Provider store={store}>
        <Router history={history}>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </Router>
      </Provider>
    );

    const mountedComponent = mount(component);

    const moduleTab = mountedComponent.find(Tab).at(0);

    moduleTab.simulate("click");

    expect(history.push, "to have a call satisfying", { args: [module.href] });
  });

  it("Calls history.push to page link when page tab is clicked", () => {
    const component = (
      <Provider store={store}>
        <Router history={history}>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </Router>
      </Provider>
    );

    const mountedComponent = mount(component);

    const pageTab = mountedComponent.find(Tab).at(1);

    pageTab.simulate("click");

    expect(history.push, "to have a call satisfying", { args: [pages[0].href] });
  });

  it("Calls history.push to page link when page tab is selected via Select", () => {
    const component = (
      <Provider store={store}>
        <Router history={history}>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </Router>
      </Provider>
    );

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [true, setState]);

    const mountedComponent = mount(component);

    const select = mountedComponent.find(SelectMUI);

    select.invoke("onChange")({ target: { value: 2 } });

    expect(history.push, "to have a call satisfying", { args: [pages[2].href] });
  });

  it("Calls correct close callback when close icon for specific page tab is clicked and tab was not modified", () => {
    const component = (
      <Provider store={store}>
        < MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const mountedComponent = mount(component);

    const pageTab = mountedComponent.find(Tab).at(1);
    const closeIcon = pageTab.find(Icon);

    closeIcon.simulate("click");

    expect(pages[0].close, "was called");
  });

  it("Calls correct close callback when close icon for specific page tab is clicked and tab was modified", () => {
    const component = (
      <Provider store={store}>
        < MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = sinon.spy();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((value) => [value, setState]);

    const mountedComponent = mount(component);

    const pageTab = mountedComponent.find(Tab).at(3);
    const closeIcon = pageTab.find(Icon);

    closeIcon.simulate("click");

    expect(setState, "to have a call satisfying", { args: [{ closeCallback: pages[2].close, href: pages[2].href }] });

    expect(setState, "to have a call satisfying", { args: [true] });
  });

  it("Handles onResize correct when isScrollVisible returns false", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = sinon.spy();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((value) => [value, setState]);

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
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = sinon.spy();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((value) => [value, setState]);

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
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const dispatchSpy = sinon.spy();
    const useDispatchWithModulesDataStub =
      sinon.stub(useDispatchWithModulesData, "useDispatchWithModulesData").returns(dispatchSpy);

    const useStateStub = sinon.stub(ReactMock, "useState");
    useStateStub.withArgs(undefined).returns([
      { closeCallback: pages[2].close, href: pages[2].href }, jest.fn()
    ]);

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
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
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
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en-US" messages={messages}>
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
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
});

describe("TabLink", () => {
  it("Renders TabLink correctly", () => {
    const href = "link";
    const child = <div>child</div>;
    const close = <div>close</div>;

    const component = (
      <MemoryRouter>
        <TabLink to={href} close={close}>
          {child}
        </TabLink>
      </MemoryRouter>
    );

    const expected = (
      <MemoryRouter>
        <Link to={href}>
          {child}
          {close}
        </Link>
      </MemoryRouter>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });
});