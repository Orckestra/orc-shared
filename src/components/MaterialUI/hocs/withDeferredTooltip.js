import React, { useState } from "react";
import MuiTooltip from "@material-ui/core/Tooltip";

const withDeferredTooltip = Comp => ({ title = "", ...props }) => {

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

  if (shouldBeTooltipped === false) return defaultComponent;

  return (
    <MuiTooltip
      arrow
      title={title}
      disableHoverListener={false}
      disableFocusListener={true}
      disableTouchListener={true}
    >
      {defaultComponent}
    </MuiTooltip>
  );
};

export default withDeferredTooltip;
