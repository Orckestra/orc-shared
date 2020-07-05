import React from "react";
import MuiPaper from '@material-ui/core/Paper';
import PaperProps from "./paperProps";
import classNames from "classnames";

const Paper = ({ content, paperProps }) => {
  if (
    paperProps != null &&
    paperProps instanceof PaperProps === false
  ) {
    throw new TypeError(
      "paperProps property is not of type PaperProps",
    );
  }

  const rootStyle = paperProps?.getStyle(PaperProps.ruleNames.root);

  return (
    <MuiPaper classes={{ root: classNames(rootStyle) }} variant="outlined">
      {content}
    </MuiPaper>
  );
};

export default Paper;