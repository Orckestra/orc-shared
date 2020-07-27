import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	icon: {
		color: "initial",
		width: "1em",
		height: "1em",
		fill: "currentColor",
		stroke: "currentColor",
	},
}));

const Icon = ({ id, ...props }) => {
	const classes = useStyles();

	return (
		<SvgIcon fontSize="inherit" {...props} classes={{ root: classes.icon }}>
			<use href={`#icon-${id}`} />
		</SvgIcon>
	);
};

export default Icon;
