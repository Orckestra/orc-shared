import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Icon from "../Icon";

const TooltippedIcon = ({ titleValue, id, className, ...props }) => {
	return (
		<Tooltip title={titleValue} arrow>
			<span className={className} data-test-id="icon-container">
				<Icon id={id} {...props} />
			</span>
		</Tooltip>
	);
};

export default TooltippedIcon;
