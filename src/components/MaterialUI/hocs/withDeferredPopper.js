import React, { useState } from "react";
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  isString,
  isObject,
  isStringNullOrWhitespace,
  isReactComponent,
} from "../../../utils/propertyValidator";

const withDeferredPopper = Comp => ({ popperValue, ...props }) => {
  const [popperState, setPopperState] = useState({
    isDisplayed: false,
    anchorElement: null
  });

  const defaultComponent = (
    <Comp onClick={(event) => togglePopper(event)} {...props} />
  );

  const togglePopper = function (event) {
    const isDisplayed = !popperState.isDisplayed;
    const anchorElement = popperState.anchorElement ? null : event.currentTarget;
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
          modifiers={{
            arrow: {
              enabled: true
            }
          }}
          open={popperState.isDisplayed}
          anchorEl={popperState.anchorElement}
        >
          {popperValue}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default withDeferredPopper;