import React, { useState } from "react";
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  isString,
  isObject,
  isStringNullOrWhitespace,
  isReactComponent,
} from "../../../utils/propertyValidator";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: 1,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
      marginTop: '-0.25em',
      width: '0.4em',
      height: '0.4em',
      borderColor: `${theme.palette.grey.icon} transparent transparent ${theme.palette.grey.icon}`,
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
      marginBottom: '-0.25em',
      width: '0.4em',
      height: '0.4em',
      borderColor: `transparent ${theme.palette.grey.icon} ${theme.palette.grey.icon} transparent`,
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      top: "50%",
      marginLeft: '-0.25em',
      transform: "translateY(-50%) rotate(45deg)",
      width: '0.4em',
      height: '0.4em',
      borderColor: `transparent transparent ${theme.palette.grey.icon} ${theme.palette.grey.icon}`,
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      top: "50%",
      marginRight: '-0.25em',
      transform: "translateY(-50%) rotate(45deg)",
      width: '0.4em',
      height: '0.4em',
      borderColor: `${theme.palette.grey.icon} ${theme.palette.grey.icon} transparent transparent`,
    },
  },
  arrow: {
    position: "absolute",
    border: "1px solid",
    backgroundColor: theme.palette.background.paper,
  }
}));

export const Arrow = () => {
  const classes = useStyles();

  return <div className={classes.arrow} />
}

const withDeferredPopper = Comp => ({ popperValue, ...props }) => {
  const classes = useStyles();

  const [popperState, setPopperState] = useState({
    isDisplayed: false,
    anchorElement: null,
    arrowRef: null
  });

  const defaultComponent = (
    <Comp onClick={(event) => togglePopper(event)} {...props} />
  );

  const togglePopper = function (event) {
    const isDisplayed = !popperState.isDisplayed;
    const anchorElement = event.currentTarget;
    setPopperState({
      isDisplayed: isDisplayed,
      anchorElement: anchorElement
    })
  };

  const clickAwayHandler = function () {
    setPopperState({
      isDisplayed: false,
      anchorElement: null
    })
  }

  if (popperValue == null) return <Comp {...props} />;

  if (isString(popperValue) && isStringNullOrWhitespace(popperValue))
    return <Comp {...props} />;

  if (isObject(popperValue) && isReactComponent(popperValue) === false)
    return <Comp {...props} />;

  return (
    <ClickAwayListener onClickAway={() => clickAwayHandler()}>
      <div>
        {defaultComponent}
        <Popper
          className={classes.popper}
          modifiers={{
            offset: {
              offset: "0, 10"
            },
            arrow: {
              enabled: true,
              element: popperState.arrowRef
            }
          }}
          open={popperState.isDisplayed}
          anchorEl={popperState.anchorElement}
        >
          <Arrow ref={popperState.arrowRef} />
          {popperValue}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withDeferredPopper;