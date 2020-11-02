import React from "react";
import SwitchMui from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import SwitchProps, { isSwitchProps } from "./SwitchProps";

export const useStyles = makeStyles(theme => ({
	root: {
		width: theme.spacing(6.4),
		height: theme.spacing(1.7),
		padding: 0,
	},
	switchBase: {
		padding: theme.spacing(0.2),
		border: "none",
		"&:hover, &:active": {
			backgroundColor: "unset",
			boxShadow: "unset",
		},
	},
	input: {
		left: "-250%",
		width: "600%",
	},
	thumb: {
		width: theme.spacing(1.3),
		height: theme.spacing(1.3),
		backgroundColor: theme.palette.background.default,
	},
	track: {
		backgroundColor: theme.palette.grey.borders,
		opacity: "1 !important",
		borderRadius: "20px",
		position: "relative",
		"&:before, &:after": {
			display: "inline-block",
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			textAlign: "center",
			fontSize: theme.spacing(1),
		},
		"&:before": {
			content: props => `"${props.onCaption}"`,
			left: theme.spacing(0.9),
			opacity: 0,
		},
		"&:after": {
			content: props => `"${props.offCaption}"`,
			right: theme.spacing(0.9),
		},
	},
	checked: {
		"&$switchBase": {
			transform: `translateX(${theme.spacing(4.7)})`,
		},
		"& + $track": {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.background.default,
			"&:before": {
				opacity: 1,
			},
			"&:after": {
				opacity: 0,
			},
		},
	},
	disabled: {
		"& + $track": {
			backgroundColor: `${theme.palette.grey.borders} !important`,
		},
	},
}));

const Switch = ({ switchProps }) => {
	if (isSwitchProps(switchProps) === false) {
		throw new TypeError("switchProps property is not of type SwitchProps");
	}

	const update = switchProps?.get(SwitchProps.propNames.update);
	const value = switchProps?.get(SwitchProps.propNames.value) || false;
	const onCaption = switchProps?.get(SwitchProps.propNames.onCaption);
	const offCaption = switchProps?.get(SwitchProps.propNames.offCaption);
	const disabled = switchProps?.get(SwitchProps.propNames.disabled);

	const classes = useStyles({ onCaption, offCaption });

	return (
		<SwitchMui
			disabled={disabled}
			classes={classes}
			checked={value}
			onChange={e => update(e.target.checked)}
			color={"primary"}
		/>
	);
};

export default Switch;
