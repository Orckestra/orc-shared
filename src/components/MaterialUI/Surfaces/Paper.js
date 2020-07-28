import React from "react";
import MuiPaper from '@material-ui/core/Paper';
import PaperProps from "./paperProps";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey.lighter
  }
}));

const Paper = ({ content, paperProps }) => {
  if (
    paperProps != null &&
    paperProps instanceof PaperProps === false
  ) {
    throw new TypeError(
      "paperProps property is not of type PaperProps",
    );
  }

  const classes = useStyle();

  const rootStyle = paperProps?.getStyle(PaperProps.ruleNames.root);

  return (
    <MuiPaper classes={{ root: classNames(classes.container, rootStyle) }} variant="outlined">
      {content}
    </MuiPaper>
  );
};

export default Paper;