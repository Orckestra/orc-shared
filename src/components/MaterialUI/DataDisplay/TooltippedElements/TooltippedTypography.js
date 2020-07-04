import React from "react";
import withDeferredTooltip from "../../hocs/withDeferredTooltip";
import Typography from "@material-ui/core/Typography";

const TooltipedTypography = ({ value, ...props }) => {
  const Tooltipped = withDeferredTooltip(
    React.forwardRef((wrapperProps, ref) => {
      return <Typography value={value} {...wrapperProps} ref={ref} />
    })
  );

  return <Tooltipped value={value} {...props} />;
};

export default TooltipedTypography;