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
	primary: {
		color: theme.palette.primary.main
	},
	disabled: {
		color: theme.palette.text.disabled
	}
}));

const Icon = ({ id, ...props }) => {
	const classes = useStyles();
	console.log(props);

	return (
		<SvgIcon
			fontSize="inherit"
			{...props}
			classes={{
				root: classes.icon,
				colorPrimary: classes.primary,
				colorDisabled: classes.disabled
			}}
		>
			<use href={`#icon-${id}`} />
		</SvgIcon>
	);
};

export default Icon;
