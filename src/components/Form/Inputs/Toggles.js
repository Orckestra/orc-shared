import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "../../MaterialUI/Inputs/Switch";
import SwitchProps from "../../MaterialUI/Inputs/SwitchProps";

const useStyles = makeStyles({
	centerMiddleWrapper: {
		minHeight: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export const SwitchInput = ({ update, value, ...props }) => {
	const classes = useStyles();

	const switchProps = new SwitchProps();

	switchProps.set(SwitchProps.propNames.value, value);
	switchProps.set(SwitchProps.propNames.onCaption, props.onCaption);
	switchProps.set(SwitchProps.propNames.offCaption, props.offCaption);
	switchProps.set(SwitchProps.propNames.disabled, props.disabled);
	switchProps.set(SwitchProps.propNames.update, input => update(input));

	return (
		<div className={classes.centerMiddleWrapper}>
			<Switch switchProps={switchProps} />
		</div>
	);
};
