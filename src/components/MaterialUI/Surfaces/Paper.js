import React from "react";
import MuiPaper from '@material-ui/core/Paper';
import PaperProps, { isPaperProps } from "./paperProps";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey.lighter
  }
}));

const Paper = ({ content, paperProps }) => {
  if (isPaperProps(paperProps) === false) {
    throw new TypeError(
      "paperProps property is not of type PaperProps",
    );
  }

  const classes = useStyle();

  const elevation = paperProps?.get(PaperProps.propNames.elevation) || 0;
  const square = paperProps?.get(PaperProps.propNames.square) || false;
  const variant = paperProps?.get(PaperProps.propNames.variant) || "outlined";

  const rootStyle = paperProps?.getStyle(PaperProps.ruleNames.root);

  return (
    <MuiPaper
      classes={{ root: classNames(classes.container, rootStyle) }}
      elevation={elevation}
      square={square}
      variant={variant}>
      {content}
    </MuiPaper>
  );
};

export default Paper;