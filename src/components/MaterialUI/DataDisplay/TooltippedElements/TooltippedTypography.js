import React from "react";
import withDeferredTooltip from "../../hocs/withDeferredTooltip";
import Typography from "@mui/material/Typography";

const TooltippedTypography = withDeferredTooltip(
	React.forwardRef((wrapperProps, ref) => {
		return <Typography {...wrapperProps} ref={ref} />;
	}),
);

export default TooltippedTypography;
