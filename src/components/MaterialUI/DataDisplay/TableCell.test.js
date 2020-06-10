import React from "react";
import { mount } from "enzyme";
import TableCell from "./TableCell";
import Tooltip from "./Tooltip";
import TableCellMui from "@material-ui/core/TableCell";
import {
  ignoreConsoleError
} from "./../../../utils/testUtils";
import { FormattedNumber, FormattedMessage } from "react-intl";
import { IntlProvider } from "react-intl";

describe("TableCell", () => {


  it("Renders Table Cell correctly when primitive value was passed", () => {
    ignoreConsoleError(() => {
      const value = "123";
      const component = <TableCell cell={value} />;

      const expected = (
        <TableCellMui>
          <Tooltip value={value} />
        </TableCellMui>
      );

      const mountedComponent = mount(component);

      expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
    });
  });

  it("Renders Table Cell correctly when non primitive component was passed", () => {
    ignoreConsoleError(() => {
      const comp = (
        <div>
          test123
        </div>
      );
      const component = <TableCell cell={comp} />;

      const expected = (
        <div>
          test123
        </div>
      );

      const mountedComponent = mount(component);

      expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
    });
  });
});