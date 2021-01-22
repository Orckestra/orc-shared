import React from "react";
import TreeItem, { ScopeIcon, ScopeLabel } from "./TreeItem";
import TreeItemMui from '@material-ui/lab/TreeItem';
import Icon from "./../DataDisplay/Icon";
import MultipleLinesText from "./../DataDisplay/TooltippedElements/MultipleLinesText";
import TextProps from "./../textProps";
import Immutable from "immutable";
import { scopeTypes } from "./../../../constants";
import { Provider } from "react-redux";
import sinon from "sinon";
import { MemoryRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme, generateClassName } from "./../../../utils/testUtils";
import { StylesProvider } from "@material-ui/core/styles";
import { mount } from "enzyme";

describe("TreeItem", () => {
  let store, state;

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
      subscribe: () => { },
      dispatch: sinon.spy().named("dispatch"),
    };
  });

  const globalScope = {
    id: "Global",
    name: "Global",
    type: scopeTypes.global,
    children: ["TestVirtual"]
  };
  const virtualScope = {
    id: "TestVirtual",
    name: "Test Virtual",
    type: scopeTypes.virtual,
    children: ["TestSale"]
  };

  const saleScope = {
    id: "TestSale",
    name: "Test Sale",
    type: scopeTypes.sale,
    children: []
  };

  const rootId = "Global";

  const expandIcon = <Icon id="dropdown-chevron-down" />;
  const collapseIcon = <Icon id="dropdown-chevron-up" />;

  const theme = createMuiTheme();

  const closeSelectorSpy = sinon.spy();

  it("Renders Tree Item correctly for global scope", () => {
    const expectedGlobalLabel =
      <ScopeLabel name={globalScope.name} type={globalScope.type} isRootScope={true} isVirtualScope={false} />;

    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <StylesProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <TreeItem scope={globalScope} rootId={rootId} />
            </MuiThemeProvider>
          </StylesProvider>
        </MemoryRouter>
      </Provider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <TreeItemMui
            nodeId={globalScope.id}
            label={expectedGlobalLabel}
          />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });


  it("Renders Tree Item correctly for virtual scope", () => {
    const expectedVirtualLabel =
      <ScopeLabel name={virtualScope.name} type={virtualScope.type} isRootScope={false} isVirtualScope={false} />;

    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <StylesProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <TreeItem scope={virtualScope} rootId={rootId} />
            </MuiThemeProvider>
          </StylesProvider>
        </MemoryRouter>
      </Provider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <TreeItemMui
            nodeId={virtualScope.id}
            label={expectedVirtualLabel}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
          />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Calls scope select handler on label click if scope type is not virtual", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <StylesProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
              <TreeItem scope={saleScope} rootId={rootId} closeSelector={closeSelectorSpy} />
            </MuiThemeProvider>
          </StylesProvider>
        </MemoryRouter>
      </Provider>
    );

    const preventDefaultSpy = sinon.spy();

    const mountedComponent = mount(component);

    const saleScopeLabel = mountedComponent.find(TreeItemMui);

    const event = {
      preventDefault: preventDefaultSpy
    };

    saleScopeLabel.invoke("onLabelClick")(event);

    expect(preventDefaultSpy, "was called");
    expect(closeSelectorSpy, "to have a call satisfying", { args: [event] });
  });

  it("Does not calls scope select handler on label click if scope type is virtual", () => {
    const component = (
      <Provider store={store}>
        <MemoryRouter>
          <StylesProvider generateClassName={generateClassName} closeSelector={closeSelectorSpy}>
            <MuiThemeProvider theme={theme}>
              <TreeItem scope={virtualScope} rootId={rootId} />
            </MuiThemeProvider>
          </StylesProvider>
        </MemoryRouter>
      </Provider>
    );

    const preventDefaultSpy = sinon.spy();

    const mountedComponent = mount(component);

    const virtualScopeLabel = mountedComponent.find(TreeItemMui);

    const event = {
      preventDefault: preventDefaultSpy
    };

    virtualScopeLabel.invoke("onLabelClick")(event);

    expect(preventDefaultSpy, "was called once");
    expect(closeSelectorSpy, "to have no calls satisfying", { args: [event] });
  });
});

describe("ScopeLabel", () => {
  const scopeName = "Test";
  const theme = createMuiTheme();

  it("Renders Scope Label for root scope correctly", () => {
    const component =
      (
        <StylesProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <ScopeLabel name={scopeName} type={scopeTypes.global} isRootScope />
          </MuiThemeProvider>
        </StylesProvider>
      );

    const multipleLinesTextProps = new TextProps();
    multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <div>
            <ScopeIcon type={scopeTypes.global} />
            <MultipleLinesText textProps={multipleLinesTextProps} children={scopeName} />
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Renders Scope Label for non root scope correctly", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeLabel name={scopeName} type={scopeTypes.virtual} isRootScope={false} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    const multipleLinesTextProps = new TextProps();
    multipleLinesTextProps.set(TextProps.propNames.lineCount, 3);

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <div>
            <span />
            <ScopeIcon type={scopeTypes.virtual} />
            <MultipleLinesText textProps={multipleLinesTextProps} children={scopeName} />
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });
});

describe("ScopeIcon", () => {
  const theme = createMuiTheme();

  it("Renders correct Icon for scope type Global", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeIcon type={scopeTypes.global} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Icon color="primary" fontSize="default" id="global-scope" />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Renders correct Icon for scope type Virtual", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeIcon type={scopeTypes.virtual} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Icon themeColor={theme.palette.grey.dark} fontSize="default" id="virtual-scope" />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Renders correct Icon for scope type Sales", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeIcon type={scopeTypes.sale} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Icon color="primary" fontSize="default" id="sales-scope" />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Renders correct Icon for scope type Dependant", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeIcon type={scopeTypes.dependant} />
        </MuiThemeProvider>
      </StylesProvider>
    );

    const expected = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <Icon themeColor={theme.palette.success.main} fontSize="default" id="dependent-scope" />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });

  it("Renders nothing if type is wrong", () => {
    const component = (
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <ScopeIcon type="Wrong" />
        </MuiThemeProvider>
      </StylesProvider>
    );

    expect(component, "when mounted", "to satisfy", null);
  });
});