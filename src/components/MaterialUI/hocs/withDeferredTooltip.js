import React, { useState } from "react";
import MuiTooltip from "@material-ui/core/Tooltip";
import { isString, isObject, isStringNullOrWhitespace, isReactComponent } from "../../../utils/propertyValidator";

// Pay attention that if component you are passed to this HOC contains titleValue property
// by itself then that property will be disappeared after using that HOC.
// To fix it rename that property and pass titleValue just as a title for tooltip.

const withDeferredTooltip = Comp => ({ titleValue, alwaysDisplay, ...props }) => {
  const [shouldBeTooltipped, setShouldBeTooltipped] = useState(false);

  const defaultComponent = (
    <Comp
      onMouseEnter={(event) => makeComponentTooltipped(event)}
      onClick={() => console.log(titleValue)}
      {...props}
    />
  );

  const makeComponentTooltipped = function (event) {
    if (alwaysDisplay) {
      setShouldBeTooltipped(true);
    }
    else {
      setShouldBeTooltipped(event.target.offsetWidth < event.target.scrollWidth);
    }
  }

  if (titleValue == null) return <Comp {...props} />;

  if (isString(titleValue) && isStringNullOrWhitespace(titleValue)) return <Comp {...props} />;

  if (isObject(titleValue) && isReactComponent(titleValue) === false) return <Comp {...props} />;

  if (shouldBeTooltipped === false) return defaultComponent;

  return (
    <MuiTooltip
      arrow
      title={titleValue}
      disableHoverListener={false}
      disableFocusListener={true}
      disableTouchListener={true}
    >
      {defaultComponent}
    </MuiTooltip>
  );
};

export default withDeferredTooltip;