import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const Icon = ({ id, themeColor, ...props }) => {
	return (
		<SvgIcon fontSize={props.fontSize ?? "inherit"} {...props}>
			<use href={`#icon-${id}`} />
		</SvgIcon>
	);
};

export default Icon;
