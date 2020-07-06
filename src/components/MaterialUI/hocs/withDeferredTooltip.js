import React, { useState } from "react";
import MuiTooltip from "@material-ui/core/Tooltip";
import { isString, isObject, isStringNullOrWhitespace, isReactComponent } from "../../../utils/propertyValidator";

const withDeferredTooltip = Comp => ({ value, ...props }) => {

  const [shouldBeTooltipped, setShouldBeTooltipped] = useState(false);

  const defaultComponent = (
    <Comp
      onMouseEnter={(event) => makeComponentTooltipped(event)}
      {...props}
    />
  );

  const makeComponentTooltipped = function (event) {
    setShouldBeTooltipped(event.target.offsetWidth < event.target.scrollWidth);
  }

  if (value == null) return <Comp {...props} />;

  if (isString(value) && isStringNullOrWhitespace(value)) return <Comp {...props} />;

  if (isObject(value) && isReactComponent(value) === false) return <Comp {...props} />;

  if (shouldBeTooltipped === false) return defaultComponent;

  return (
    <MuiTooltip
      arrow
      title={value}
      disableHoverListener={false}
      disableFocusListener={true}
      disableTouchListener={true}
    >
      {defaultComponent}
    </MuiTooltip>
  );
};

export default withDeferredTooltip;