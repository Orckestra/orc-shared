import React from "react";
import TableCellMui from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";

const useStyles = makeStyles(theme => ({
  cellRoot: {
    maxWidth: theme.spacing(15),
  }
}));

const TableCell = ({ cell = null }) => {
  const classes = useStyles();

  return (
    <TableCellMui
      classes={{
        root: classNames(classes.cellRoot),
      }}
    >
      {shouldWrapComponentInTooltip(cell) === true ? <TooltippedTypography value={cell} children={cell} /> : cell}
    </TableCellMui>
  );
};

export const shouldWrapComponentInTooltip = function (component) {
  if (component === null) {
    return false;
  }

  if (React.isValidElement(component)) {
    if (componentTypeNamesToBeWrapped.includes(component.type.displayName) === false) {
      return false;
    }
  }

  return true;
}

const componentTypeNamesToBeWrapped = [
  "FormattedMessage",
  "FormattedNumber"
]

export default TableCell;
