import React from "react";
import { shallow } from "enzyme";
import TableCell, { shouldWrapComponentInTooltip } from "./TableCell";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";
import TableCellMui from "@material-ui/core/TableCell";
import {
  ignoreConsoleError
} from "./../../../utils/testUtils";
import { FormattedNumber, FormattedMessage } from "react-intl";

describe("TableCell", () => {


  it("Renders Table Cell correctly when primitive value was passed", () => {
    ignoreConsoleError(() => {
      const value = "123";
      const component = <TableCell cell={value} />;

      const expected = (
        <TableCellMui>
          <TooltippedTypography titleValue={value} children={value} />
        </TableCellMui>
      );

      const mountedComponent = shallow(component);

      expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
    });
  });

  it("Renders Table Cell correctly when no cell was passed", () => {
    ignoreConsoleError(() => {
      const component = <TableCell />;

      const expected = (
        <TableCellMui>
        </TableCellMui>
      );

      const mountedComponent = shallow(component);

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

      const mountedComponent = shallow(component);

      expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
    });
  });
});

describe("ShouldWrapComponentInTooltip", () => {
  it("Returns correct values", () => {
    const text = "text";

    expect(shouldWrapComponentInTooltip(text), "to be", true);

    expect(shouldWrapComponentInTooltip(<FormattedMessage />), "to be", true);

    expect(shouldWrapComponentInTooltip(<FormattedNumber />), "to be", true);

    expect(shouldWrapComponentInTooltip(<div>{text}</div>), "to be", false);

    expect(shouldWrapComponentInTooltip(null), "to be", false);
  });
});