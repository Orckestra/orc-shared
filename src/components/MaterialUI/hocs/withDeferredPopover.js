import React, { useState } from "react";
import MuiTooltip from "@material-ui/core/Tooltip";
import {
  isString,
  isObject,
  isStringNullOrWhitespace,
  isReactComponent,
} from "../../../utils/propertyValidator";

const withDeferredPopover = Comp => ({ titleValue, ...props }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const defaultComponent = (
    <Comp onClick={() => toggleTooltip()} {...props} />
  );

  const toggleTooltip = function () {
    setIsDisplayed(!isDisplayed);
  };

  if (titleValue == null) return <Comp {...props} />;

  if (isString(titleValue) && isStringNullOrWhitespace(titleValue))
    return <Comp {...props} />;

  if (isObject(titleValue) && isReactComponent(titleValue) === false)
    return <Comp {...props} />;

  return (
    <MuiTooltip
      arrow
      title={titleValue}
      disableHoverListener={true}
      disableFocusListener={true}
      disableTouchListener={true}
      open={isDisplayed}
    >
      {defaultComponent}
    </MuiTooltip>
  );
};

export default withDeferredPopover;
