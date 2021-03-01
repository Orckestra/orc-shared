import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "../Icon";

const TooltippedIcon = ({ titleValue, id, ...props }) => {
	return (
		<Tooltip title={titleValue} arrow>
			<span>
				<Icon id={id} {...props} />
			</span>
		</Tooltip>
	);
};

export default TooltippedIcon;
