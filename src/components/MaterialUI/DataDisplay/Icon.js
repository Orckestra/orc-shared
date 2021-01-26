import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	icon: {
		color: props => (props.themeColor ?? "initial"),
		width: "1em",
		height: "1em",
		fill: "currentColor",
		stroke: "currentColor",
	},
	primary: {
		color: props => (props.themeColor ?? theme.palette.primary.main)
	},
	disabled: {
		color: props => (props.themeColor ?? theme.palette.text.disabled)
	},
}));

const Icon = ({ id, themeColor, ...props }) => {
	const classes = useStyles({ themeColor });

	return (
		<SvgIcon
			fontSize={props.fontSize ?? "inherit"}
			classes={{
				root: classes.icon,
				colorPrimary: classes.primary,
				colorDisabled: classes.disabled,
			}}
			{...props}
		>
			<use href={`#icon-${id}`} />
		</SvgIcon>
	);
};

export default Icon;
