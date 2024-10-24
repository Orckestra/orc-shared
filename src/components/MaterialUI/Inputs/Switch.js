import React from "react";
import classNames from "classnames";
import SwitchMui from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import SwitchProps, { isSwitchProps } from "./SwitchProps";
import { useIntl } from "react-intl";

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
		cursor: "inherit",
	},
	inputReadOnly: {
		cursor: "default",
	},
	thumb: {
		width: theme.spacing(1.3),
		height: theme.spacing(1.3),
		backgroundColor: theme.palette.background.default,
		display: "inherit",
	},
	thumbReadOnly: {
		display: "none",
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
			content: props => `"${props.formattedOnCaption}"`,
			left: theme.spacing(0.9),
			opacity: 0,
		},
		"&:after": {
			content: props => `"${props.formattedOffCaption}"`,
			right: theme.spacing(0.9),
		},
	},
	trackReadOnly: {
		"&:before": {
			right: theme.spacing(0.9),
		},
		"&:after": {
			left: theme.spacing(0.9),
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
	const { formatMessage } = useIntl();

	if (isSwitchProps(switchProps) === false) {
		throw new TypeError("switchProps property is not of type SwitchProps");
	}

	const update = switchProps?.get(SwitchProps.propNames.update);
	const value = switchProps?.get(SwitchProps.propNames.value) || false;
	const onCaption = switchProps?.get(SwitchProps.propNames.onCaption);
	const offCaption = switchProps?.get(SwitchProps.propNames.offCaption);
	const disabled = switchProps?.get(SwitchProps.propNames.disabled) || false;
	const readOnly = switchProps?.get(SwitchProps.propNames.readOnly);
	const className = switchProps?.get(SwitchProps.propNames.className) || "";
	const metadata = switchProps?.get(SwitchProps.propNames.metadata) || null;

	const formattedOnCaption = onCaption != null ? formatMessage(onCaption) : "";
	const formattedOffCaption = offCaption != null ? formatMessage(offCaption) : "";

	const classes = useStyles({ formattedOnCaption, formattedOffCaption });
	const switchClasses = {
		root: classes.root,
		switchBase: classes.switchBase,
		input: classNames(classes.input, { [classes.inputReadOnly]: readOnly }),
		thumb: classNames(classes.thumb, { [classes.thumbReadOnly]: readOnly }),
		track: classNames(classes.track, { [classes.trackReadOnly]: readOnly }),
		checked: classes.checked,
		disabled: classes.disabled,
		...className,
	};

	return (
		<SwitchMui
			disabled={disabled}
			classes={switchClasses}
			checked={value}
			onChange={e => (!readOnly ? update(e.target.checked, metadata) : null)}
			color={"primary"}
		/>
	);
};

export default Switch;
