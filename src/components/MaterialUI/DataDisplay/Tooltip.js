import React, { useEffect, useRef } from "react";
import MuiTooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: props => props.maxWidth,
    display: "inline-block"
  },
  noWrap: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tooltip: {
    maxWidth: "100%",
    "& p": {
      fontSize: theme.typography.fontSize
    }
  }
}));

const Tooltip = ({ value, maxWidth = 0 }) => {
  const classes = useStyles({ maxWidth });

  const ref = useRef(null);

  const [isDisplayed, setIsDisplayed] = React.useState(false);


  useEffect(() => {
    setIsDisplayed(ref.current.clientWidth >= maxWidth);
  }, [maxWidth]);

  return (
    <MuiTooltip
      arrow
      title={value}
      disableHoverListener={!isDisplayed}
      classes={{ tooltip: classes.tooltip }}
    >
      <div className={classNames(classes.noWrap, classes.container)} ref={ref}>
        {value}
      </div>
    </MuiTooltip>
  )
};

export default Tooltip;