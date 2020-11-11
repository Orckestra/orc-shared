import React, { useRef } from "react";
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
import { act } from "react-dom/test-utils";
import * as TabsToStub from '@material-ui/core/Tabs';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import * as reactMock from "react";

describe("TabBar", () => {
  let store, state;
  const history = createMemoryHistory({ initialEntries: ["/"] });
  sinon.spy(history, "push");

  const messages = {
    module1: { id: "module1", defaultMessage: "Module 1" },
    page1: { id: "page1", defaultMessage: "Page 1" },
    page2: { id: "page2", defaultMessage: "Page 2" },
    page3: { id: "page3", defaultMessage: "Page 3" },
  };

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
      active: false,
      close: sinon.spy()
    },
    {
      label: messages.page2,
      href: '/Scope1/module1/page2',
      active: false,
      close: sinon.spy()
    },
    {
      label: messages.page3,
      href: '/Scope1/module1/page3',
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
    sortOrder: 0
  });
  tabLabels.push({
    value: 1,
    label: page2TabLabel,
    sortOrder: 1
  });
  tabLabels.push({
    value: 2,
    label: page3TabLabel,
    sortOrder: 2
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

  const expectedTabs = (
    <Tabs
      value={false}
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab
        label={page1TabLabel}
        key={pages[0].href}
        to={pages[0].href}
        value={0}
        component={TabLink}
        close={closeIcon}
      />
      <Tab
        label={page2TabLabel}
        key={pages[1].href}
        to={pages[1].href}
        value={1}
        component={TabLink}
        close={closeIcon}
      />
      <Tab
        label={page3TabLabel}
        key={pages[2].href}
        to={pages[2].href}
        value={2}
        component={TabLink}
        close={closeIcon}
      />
    </Tabs>
  );

  beforeEach(() => {
    state = Immutable.fromJS({});
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
          <IntlProvider locale="en">
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const expected = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
            <div>
              <ResizeDetector />
              {expectedModuleTab}
              {expectedTabs}
            </div>
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Contains proper Select element when it's visible", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
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
          <IntlProvider locale="en">
            <div>
              <ResizeDetector />
              {expectedModuleTab}
              {expectedTabs}
              {select}
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
          <IntlProvider locale="en">
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
          <IntlProvider locale="en">
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
          <IntlProvider locale="en">
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

  it("Calls correct close callback when close icon for specific page tab is clicked", () => {
    const component = (
      <Provider store={store}>
        < MemoryRouter>
          <IntlProvider locale="en">
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const mountedComponent = mount(component);

    const pageTab = mountedComponent.find(Tab).at(1);
    const closeIcon = pageTab.find(Icon);

    closeIcon.simulate("click");

    expect(pages[0].close, "was called")
  });

  it("Handles onResize correct when childElementCount <= 2", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = sinon.spy();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((value) => [value, setState]);

    const mountedComponent = mount(component);

    const resizeDetector = mountedComponent.find(ResizeDetector);

    resizeDetector.invoke("onResize")();

    expect(setState, "to have a call satisfying", { args: [false] });
  });

  it("Handles onResize correct when childElementCount > 2", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <IntlProvider locale="en">
            <TabBar module={module} pages={pages} />
          </IntlProvider>
        </MemoryRouter>
      </Provider>
    );

    const setState = sinon.spy();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((value) => [value, setState]);

    // jest.mock("react", () => ({
    //   ...jest.requireActual("react"),
    //   useRef: jest.fn().mockReturnValue({ current: { childElementCount: 4 } })
    // }));

    //const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue({ current: { childElementCount: 4 } });

    //sinon.stub(React, "useRef").onFirstCall().returns({ current: { childElementCount: 4 } });

    // sinon.stub(React, "useRef").callsFake(() => {
    //   return { current: { childElementCount: 4 } };
    // });

    //sinon.stub(React, "useRef").withArgs("yellow").returns({ current: { childElementCount: 4 } });

    const mountedComponent = mount(component);

    const tabs = mountedComponent.find(Tabs);

    console.log(window.innerWidth);

    //tabs.setProps({ scrollButtons: "on" });

    expect(setState, "to have a call satisfying", { args: [true] }); // need to compare with true
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