import React from "react";
import TabLabel from "./TabLabel";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import Immutable from "immutable";

describe("TabLabel", () => {
  let store, state;
  beforeEach(() => {
    state = Immutable.fromJS({});
    store = {
      subscribe: () => { },
      getState: () => state,
      dispatch: () => { },
    };
  });

  it("Renders TabLabel correctly", () => {
    const message = { id: "test.msg", defaultMessage: "Test message" };
    const component = (
      <Provider store={store}>
        <IntlProvider locale="en">
          <TabLabel label={message} />
        </IntlProvider>
      </Provider>
    );

    expect(component, "when mounted", "to satisfy", message.defaultMessage);
  });
});