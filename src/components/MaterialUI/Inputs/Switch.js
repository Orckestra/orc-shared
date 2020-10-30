import React from "react";
import SwitchMui from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import SwitchProps, { isSwitchProps } from "./SwitchProps";

export const useStyles = makeStyles(theme => ({
	root: {
		width: 64,
		height: 17,
		padding: 0,
	},
	switchBase: {
		padding: 2,
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
		width: 13,
		height: 13,
		backgroundColor: "#fff",
	},
	track: {
		backgroundColor: theme.palette.grey.borders,
		color: "#232323",
		opacity: "1 !important",
		borderRadius: 20,
		position: "relative",
		"&:before, &:after": {
			display: "inline-block",
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			textAlign: "center",
			fontSize: 10,
		},
		"&:before": {
			content: props => `"${props.onCaption}"`,
			left: 9,
			opacity: 0,
		},
		"&:after": {
			content: props => `"${props.offCaption}"`,
			right: 9,
		},
	},
	checked: {
		"&$switchBase": {
			transform: "translateX(47px)",
		},
		"& + $track": {
			backgroundColor: theme.palette.primary.main,
			color: "#fff",
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
			backgroundColor: theme.palette.grey.borders,
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
