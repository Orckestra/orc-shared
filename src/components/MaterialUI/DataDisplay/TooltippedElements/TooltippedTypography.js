import React from "react";
import withDeferredTooltip from "../../hocs/withDeferredTooltip";
import Typography from "@material-ui/core/Typography";

const TooltipedTypography = withDeferredTooltip(
  React.forwardRef((wrapperProps, ref) => {
    return <Typography {...wrapperProps} ref={ref} />
  })
);

export default TooltipedTypography;