/* eslint-disable react/style-prop-object */
import React from "react";
import { mount } from "enzyme"
import DiscountedPrice from "./DiscountedPrice";
import Typography from "@material-ui/core/Typography";
import { FormattedNumber, IntlProvider } from "react-intl";

describe("Discounted Price", () => {
  it("Renders Discounted Price correctly when current not equals to regular", () => {
    const current = 500;
    const regular = 700;
    const currency = "USD";
    const component = (
      <IntlProvider locale="en">
        <DiscountedPrice current={current} regular={regular} currency={currency} />
      </IntlProvider>
    );

    const mountedComponent = mount(component);

    const regularPrice = <FormattedNumber style="currency" currency={currency} value={regular} />;
    const currentPrice = <FormattedNumber style="currency" currency={currency} value={current} />;

    const expected = (
      <div>
        <Typography children={regularPrice} />
        <Typography children={currentPrice} />
      </div>
    );

    expect(mountedComponent.containsMatchingElement(expected), "to be true");
  });

  it("Renders Discounted Price correctly when current equals to regular", () => {
    const current = 500;
    const regular = 500;
    const currency = "USD";
    const component = (
      <IntlProvider locale="en">
        <DiscountedPrice current={current} regular={regular} currency={currency} />
      </IntlProvider>
    );

    const mountedComponent = mount(component);

    const expected = (
      <FormattedNumber style="currency" currency={currency} value={current} />
    );

    expect(mountedComponent.containsMatchingElement(expected), "to be true");
  });
});