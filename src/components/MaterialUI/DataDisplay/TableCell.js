import React, { useEffect, useRef } from "react";
import TableCellMui from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Tooltip from "./Tooltip";

const useStyles = makeStyles(theme => ({
  cellRoot: {
    maxWidth: theme.spacing(15),
    padding: props => theme.spacing(props.cellPaddingInPixels / 10)
  }
}));

const TableCell = ({ cell }) => {
  const cellPaddingInPixels = 16;

  const classes = useStyles({ cellPaddingInPixels });

  const ref = useRef(null);

  const [clientWidth, setWidth] = React.useState(0);

  useEffect(() => {
    setWidth(ref.current.clientWidth - 2 * cellPaddingInPixels); // left and right padding
  }, []);

  return (
    <TableCellMui
      ref={ref}
      classes={{
        root: classNames(classes.cellRoot),
      }}
    >
      {shouldWrapComponentInTooltip(cell) === true ? <Tooltip value={cell} maxWidth={clientWidth} /> : cell}
    </TableCellMui>
  );
};

const shouldWrapComponentInTooltip = function (component) {
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
