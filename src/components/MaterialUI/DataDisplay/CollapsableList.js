import React, { useState } from "react";
import Collapse from '@material-ui/core/Collapse';
import Icon from "./Icon";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CollapsableListProps, { isCollapsableListProps } from "./collapsableListProps";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  container: {
    width: "max-content"
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  },
  floatLeft: {
    float: "left"
  },
  floatRight: {
    float: "right"
  },
  icon: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(0.7)
  }
}));

const CollapsableList = ({ defaultElement, otherElements, collapsableListProps }) => {
  const classes = useStyles();

  if (isCollapsableListProps(collapsableListProps) === false) {
    throw new TypeError("collapsableListProps property is not of type CollapsableListProps");
  }

  const isExpanded = collapsableListProps?.get(CollapsableListProps.propNames.isExpanded) || false;

  const [open, setOpen] = useState(isExpanded);

  const handleClick = () => {
    setOpen(!open);
  };

  const hasMessage = collapsableListProps?.get(CollapsableListProps.propNames.hasMessage) || false;
  const closeMessage = collapsableListProps?.get(CollapsableListProps.propNames.closeMessage) || "";
  const openMessage = collapsableListProps?.get(CollapsableListProps.propNames.openMessage) || "";

  const expandPosition = collapsableListProps?.get(CollapsableListProps.propNames.expandPosition);

  const expandPositionClass = expandPosition === "right" ? classes.floatRight : classes.floatLeft;

  const message = open ? closeMessage : openMessage;

  const collapsableList = (
    <div className={classes.container}>
      {defaultElement}
      <Collapse in={open} timeout="auto">
        {otherElements}
      </Collapse>
      <div onClick={() => handleClick()} className={classNames(classes.toggleContainer, expandPositionClass)}>
        <Icon className={classes.icon} color="primary" id={open ? "chevron-up" : "chevron-down"} />
        {hasMessage ? <Typography color="primary" children={message} /> : null}
      </div>
    </div>
  );

  return collapsableList;
};

export default CollapsableList;